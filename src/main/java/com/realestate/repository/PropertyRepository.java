package com.realestate.repository;

import com.realestate.model.Property;
import com.realestate.db.Database;
import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PropertyRepository {

    public List<Property> findAll() {
        List<Property> properties = new ArrayList<>();
        String sql = "SELECT * FROM properties ORDER BY created_at DESC";
        try (Connection conn = Database.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                properties.add(extractPropertyFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return properties;
    }

    public Property findById(Long id) {
        String sql = "SELECT * FROM properties WHERE id = ?";
        try (Connection conn = Database.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return extractPropertyFromResultSet(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Property> findByAgentId(Long agentId) {
        List<Property> properties = new ArrayList<>();
        String sql = "SELECT * FROM properties WHERE agent_id = ? ORDER BY created_at DESC";
        try (Connection conn = Database.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, agentId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                properties.add(extractPropertyFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return properties;
    }

    public Property save(Property property) {
        String sql = "INSERT INTO properties (title, description, property_type, price, area, bedrooms, bathrooms, location, city, address, image_url, available, agent_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = Database.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setString(1, property.getTitle());
            stmt.setString(2, property.getDescription());
            stmt.setString(3, property.getPropertyType());
            stmt.setBigDecimal(4, property.getPrice());
            stmt.setDouble(5, property.getArea() != null ? property.getArea() : 0.0);
            stmt.setInt(6, property.getBedrooms() != null ? property.getBedrooms() : 0);
            stmt.setInt(7, property.getBathrooms() != null ? property.getBathrooms() : 0);
            stmt.setString(8, property.getLocation());
            stmt.setString(9, property.getCity());
            stmt.setString(10, property.getAddress());
            stmt.setString(11, property.getImageUrl());
            stmt.setBoolean(12, property.isAvailable());
            stmt.setLong(13, property.getAgentId());

            int affected = stmt.executeUpdate();
            System.out.println("Rows inserted: " + affected);

            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                property.setId(rs.getLong(1));
                System.out.println("Generated ID: " + property.getId());
            }
            return property;
        } catch (SQLException e) {
            System.err.println("SQL Error in save: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public void deleteById(Long id) {
        String sql = "DELETE FROM properties WHERE id = ?";
        try (Connection conn = Database.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();
            System.out.println("Deleted property with ID: " + id);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Property> search(String city, BigDecimal minPrice, BigDecimal maxPrice, String propertyType) {
        List<Property> properties = new ArrayList<>();
        StringBuilder sql = new StringBuilder("SELECT * FROM properties WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (city != null && !city.isEmpty()) {
            sql.append(" AND city = ?");
            params.add(city);
        }
        if (minPrice != null) {
            sql.append(" AND price >= ?");
            params.add(minPrice);
        }
        if (maxPrice != null) {
            sql.append(" AND price <= ?");
            params.add(maxPrice);
        }
        if (propertyType != null && !propertyType.isEmpty()) {
            sql.append(" AND property_type = ?");
            params.add(propertyType);
        }
        sql.append(" ORDER BY created_at DESC");

        try (Connection conn = Database.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql.toString())) {
            for (int i = 0; i < params.size(); i++) {
                stmt.setObject(i + 1, params.get(i));
            }
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                properties.add(extractPropertyFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return properties;
    }

    private Property extractPropertyFromResultSet(ResultSet rs) throws SQLException {
        Property property = new Property();
        property.setId(rs.getLong("id"));
        property.setTitle(rs.getString("title"));
        property.setDescription(rs.getString("description"));
        property.setPropertyType(rs.getString("property_type"));
        property.setPrice(rs.getBigDecimal("price"));
        property.setArea(rs.getDouble("area"));
        property.setBedrooms(rs.getInt("bedrooms"));
        property.setBathrooms(rs.getInt("bathrooms"));
        property.setLocation(rs.getString("location"));
        property.setCity(rs.getString("city"));
        property.setAddress(rs.getString("address"));
        property.setImageUrl(rs.getString("image_url"));
        property.setAvailable(rs.getBoolean("available"));
        property.setAgentId(rs.getLong("agent_id"));
        property.setCreatedAt(rs.getString("created_at"));
        property.setUpdatedAt(rs.getString("updated_at"));
        return property;
    }
}