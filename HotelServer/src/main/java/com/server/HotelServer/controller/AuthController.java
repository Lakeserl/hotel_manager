package com.server.HotelServer.controller;

import com.server.HotelServer.model.dto.SignupReq;
import com.server.HotelServer.model.dto.UserDTO;
import com.server.HotelServer.services.auth.AuthService;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;

    public ResponseEntity<?> signupUser(@RequestBody SignupReq signupReq){
        try{
            UserDTO createUser = authService.createUser(signupReq);
            return new ResponseEntity<>(createUser, HttpStatus.OK);
        }catch(EntityExistsException entityExistsException){
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        }catch(Exception e){
            return new ResponseEntity<>("User not created , come again later", HttpStatus.BAD_REQUEST);
        }
    }
}
