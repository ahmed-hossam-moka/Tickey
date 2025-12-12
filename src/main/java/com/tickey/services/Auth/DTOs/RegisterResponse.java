package com.tickey.services.Auth.DTOs;

import com.tickey.entites.enums.UserRole;

public class RegisterResponse {
    private String message;
    private Long userId;
    private String email;
    private String name;
    private UserRole role;

    public RegisterResponse() {
    }

    public RegisterResponse(String message, Long userId, String email, String name, UserRole role) {
        this.message = message;
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.role = role;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}