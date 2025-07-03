package com.server.HotelServer.model.dto;

import com.server.HotelServer.model.UserRole;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String password;
    private String name;
    private UserRole userRole;
}
