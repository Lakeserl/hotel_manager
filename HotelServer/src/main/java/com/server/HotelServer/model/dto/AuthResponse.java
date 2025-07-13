package com.server.HotelServer.model.dto;

import com.server.HotelServer.model.UserRole;
import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private Long userId;
    private UserRole userRole;
}
