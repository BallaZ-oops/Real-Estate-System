package com.realestate.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.realestate.model.Property;
import com.realestate.service.PropertyService;
import com.realestate.service.UserService;
import com.realestate.utils.JwtUtils;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PropertyController {
    private final PropertyService propertyService = new PropertyService();
    private final UserService userService = new UserService();
    private final ObjectMapper mapper = new ObjectMapper();

    public String getAllProperties() {
        try {
            List<Property> properties = propertyService.getAll();
            return mapper.writeValueAsString(properties);
        } catch (Exception e) {
            return "[]";
        }
    }

    public String getPropertyById(String id) {
        try {
            Property p = propertyService.getById(Long.parseLong(id));
            return p != null ? mapper.writeValueAsString(p) : "{}";
        } catch (Exception e) {
            return "{}";
        }
    }

    public String searchProperties(String queryString) {
        try {
            Map<String, String> params = new HashMap<>();
            if (queryString != null) {
                for (String pair : queryString.split("&")) {
                    String[] kv = pair.split("=");
                    if (kv.length == 2) params.put(kv[0], kv[1]);
                }
            }
            String city = params.get("city");
            BigDecimal minPrice = params.containsKey("minPrice") ? new BigDecimal(params.get("minPrice")) : null;
            BigDecimal maxPrice = params.containsKey("maxPrice") ? new BigDecimal(params.get("maxPrice")) : null;
            String type = params.get("type");

            List<Property> properties = propertyService.search(city, minPrice, maxPrice, type);
            return mapper.writeValueAsString(properties);
        } catch (Exception e) {
            return "[]";
        }
    }

    public String createProperty(String body, String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return "{\"error\": \"Unauthorized\"}";
            }
            String token = authHeader.substring(7);
            if (!JwtUtils.validate(token)) {
                return "{\"error\": \"Invalid token\"}";
            }

            String username = JwtUtils.extractUsername(token);
            var user = userService.findByUsername(username);
            if (user == null) {
                return "{\"error\": \"User not found\"}";
            }

            Property property = mapper.readValue(body, Property.class);
            property.setAgentId(user.getId());

            Property saved = propertyService.create(property);
            if (saved != null && saved.getId() != null) {
                return mapper.writeValueAsString(saved);
            } else {
                return "{\"error\": \"Failed to save property\"}";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Create failed: " + e.getMessage() + "\"}";
        }
    }

    public String getMyProperties(String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) return "[]";
            String token = authHeader.substring(7);
            if (!JwtUtils.validate(token)) return "[]";

            String username = JwtUtils.extractUsername(token);
            var user = userService.findByUsername(username);
            if (user == null) return "[]";

            List<Property> properties = propertyService.getByAgent(user.getId());
            return mapper.writeValueAsString(properties);
        } catch (Exception e) {
            return "[]";
        }
    }

    public String deleteProperty(String id, String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return "{\"error\": \"Unauthorized\"}";
            }
            String token = authHeader.substring(7);
            if (!JwtUtils.validate(token)) {
                return "{\"error\": \"Invalid token\"}";
            }

            String username = JwtUtils.extractUsername(token);
            var user = userService.findByUsername(username);
            Long propertyId = Long.parseLong(id);
            Property property = propertyService.getById(propertyId);

            if (property == null) {
                return "{\"error\": \"Not found\"}";
            }
            if (!property.getAgentId().equals(user.getId())) {
                return "{\"error\": \"Access denied\"}";
            }

            propertyService.delete(propertyId);
            return "{\"success\": true}";
        } catch (Exception e) {
            return "{\"error\": \"Delete failed\"}";
        }
    }
}