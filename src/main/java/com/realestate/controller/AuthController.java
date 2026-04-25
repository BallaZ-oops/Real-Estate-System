package com.realestate.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.realestate.model.User;
import com.realestate.service.UserService;
import com.realestate.utils.JwtUtils;
import java.util.Map;

public class AuthController {
    private final UserService userService = new UserService();
    private final ObjectMapper mapper = new ObjectMapper();

    public String register(String body) {
        try {
            Map<String, String> data = mapper.readValue(body, Map.class);
            User user = userService.register(
                    data.get("username"),
                    data.get("email"),
                    data.get("password"),
                    data.get("firstName"),
                    data.get("lastName"),
                    data.get("phone")
            );
            if (user != null && user.getId() != null) {
                return "{\"success\": true, \"message\": \"Registration successful\"}";
            } else {
                return "{\"success\": false, \"error\": \"User already exists\"}";
            }
        } catch (Exception e) {
            return "{\"success\": false, \"error\": \"Registration failed\"}";
        }
    }

    public String login(String body) {
        try {
            Map<String, String> data = mapper.readValue(body, Map.class);
            User user = userService.login(data.get("username"), data.get("password"));
            if (user != null) {
                String token = JwtUtils.generate(user.getUsername());
                return "{\"success\": true, \"token\": \"" + token + "\", \"username\": \"" + user.getUsername() + "\", \"role\": \"" + user.getRole() + "\"}";
            } else {
                return "{\"success\": false, \"error\": \"Invalid credentials\"}";
            }
        } catch (Exception e) {
            return "{\"success\": false, \"error\": \"Login failed\"}";
        }
    }
}