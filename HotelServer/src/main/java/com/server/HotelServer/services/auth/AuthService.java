package com.server.HotelServer.services.auth;

import com.server.HotelServer.model.dto.SignupReq;
import com.server.HotelServer.model.dto.UserDTO;

public interface AuthService {
    UserDTO createUser(SignupReq signupReq);
}
