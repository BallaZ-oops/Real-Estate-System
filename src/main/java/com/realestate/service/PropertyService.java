package com.realestate.service;

import com.realestate.model.Property;
import com.realestate.repository.PropertyRepository;
import java.math.BigDecimal;
import java.util.List;

public class PropertyService {
    private final PropertyRepository propertyRepository = new PropertyRepository();

    public List<Property> getAll() {
        return propertyRepository.findAll();
    }

    public Property getById(Long id) {
        return propertyRepository.findById(id);
    }

    public Property create(Property property) {
        if (property.getAgentId() == null) {
            System.out.println("ERROR: agentId is null");
            return null;
        }
        return propertyRepository.save(property);
    }

    public void delete(Long id) {
        propertyRepository.deleteById(id);
    }

    public List<Property> getByAgent(Long agentId) {
        return propertyRepository.findByAgentId(agentId);
    }

    public List<Property> search(String city, BigDecimal minPrice, BigDecimal maxPrice, String type) {
        return propertyRepository.search(city, minPrice, maxPrice, type);
    }
}