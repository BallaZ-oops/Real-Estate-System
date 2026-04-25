package com.realestate;

import com.realestate.controller.AuthController;
import com.realestate.controller.PropertyController;
import com.realestate.db.Database;

import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {
        port(8080);

        Database.initDatabase();

        // Включаем CORS для всех запросов
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Request-Method", "*");
            response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Content-Length, Accept, Origin");
            response.type("application/json");
        });

        AuthController authController = new AuthController();
        PropertyController propertyController = new PropertyController();

        post("/api/auth/register", (req, res) -> authController.register(req.body()));
        post("/api/auth/login", (req, res) -> authController.login(req.body()));

        get("/api/properties/public", (req, res) -> propertyController.getAllProperties());
        get("/api/properties/public/:id", (req, res) -> propertyController.getPropertyById(req.params(":id")));
        get("/api/properties/search", (req, res) -> propertyController.searchProperties(req.queryString()));

        post("/api/properties", (req, res) -> propertyController.createProperty(req.body(), req.headers("Authorization")));
        get("/api/properties/my", (req, res) -> propertyController.getMyProperties(req.headers("Authorization")));
        delete("/api/properties/:id", (req, res) -> propertyController.deleteProperty(req.params(":id"), req.headers("Authorization")));

        System.out.println("========================================");
        System.out.println("✅ Real Estate Backend Started!");
        System.out.println("📍 http://localhost:8080");
        System.out.println("========================================");
    }
}