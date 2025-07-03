package com.server.HotelServer.model.dto;

import lombok.Data;

@Data
public class SignupReq {
    private String email;
    private String password;
    private String confirmPassword;
    private String name;
}
