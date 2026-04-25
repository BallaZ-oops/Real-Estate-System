package com.realestate.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class Database {
    private static final String DB_URL = "jdbc:h2:~/realestate_db;DB_CLOSE_DELAY=-1;AUTO_SERVER=TRUE";
    private static final String USER = "sa";
    private static final String PASSWORD = "";

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("org.h2.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return DriverManager.getConnection(DB_URL, USER, PASSWORD);
    }

    public static void initDatabase() {
        try (Connection conn = getConnection(); Statement stmt = conn.createStatement()) {

            stmt.execute("DROP TABLE IF EXISTS properties");
            stmt.execute("DROP TABLE IF EXISTS users");

            stmt.execute("""
                CREATE TABLE users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    first_name VARCHAR(50),
                    last_name VARCHAR(50),
                    phone VARCHAR(20),
                    role VARCHAR(20) DEFAULT 'USER',
                    enabled BOOLEAN DEFAULT TRUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """);

            stmt.execute("""
                CREATE TABLE properties (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(200) NOT NULL,
                    description TEXT,
                    property_type VARCHAR(50),
                    price DECIMAL(15,2) NOT NULL,
                    area DOUBLE,
                    bedrooms INT,
                    bathrooms INT,
                    location VARCHAR(200),
                    city VARCHAR(100),
                    address VARCHAR(255),
                    image_url VARCHAR(500),
                    available BOOLEAN DEFAULT TRUE,
                    agent_id INT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """);

            System.out.println("✅ H2 Database initialized");
        } catch (SQLException e) {
            System.err.println("Database init error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}