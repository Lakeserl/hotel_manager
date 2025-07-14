package com.server.HotelServer.model.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
