package com.server.HotelServer.services.auth;

import com.server.HotelServer.model.User;
import com.server.HotelServer.model.UserRole;
import com.server.HotelServer.model.dto.SignupReq;
import com.server.HotelServer.model.dto.UserDTO;
import com.server.HotelServer.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImp implements AuthService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostConstruct
    public void createAnAdminAccount(){
        List<User> adminAccount = userRepository.findByUserRole(UserRole.ADMIN);
        if(adminAccount.isEmpty()){
            User user = new User();
            user.setEmail("admin@test.com");
            user.setName("Admin");
            user.setUserRole(UserRole.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(user);
            System.out.println("Admin account has been created successfully");
        }else{
            System.out.println("Admin account already exists");
        }
    }

    @Override
    public UserDTO createUser(SignupReq signupReq){
        if(userRepository.findFirstByEmail(signupReq.getEmail()).isPresent()){
            throw new EntityExistsException("User already Present with email" + signupReq.getEmail());
        }
        // Confirm password validation
        if (signupReq.getPassword() == null || signupReq.getConfirmPassword() == null ||
            !signupReq.getPassword().equals(signupReq.getConfirmPassword())) {
            throw new IllegalArgumentException("Password and Confirm Password do not match");
        }
        // Password strength validation: min 6 chars, at least 1 letter and 1 number
        String password = signupReq.getPassword();
        if (password.length() < 6 || !password.matches(".*[A-Za-z].*") || !password.matches(".*\\d.*")) {
            throw new IllegalArgumentException("Password must be at least 6 characters and contain at least one letter and one number");
        }
        User user = new User();
        user.setEmail(signupReq.getEmail());
        user.setName(signupReq.getName());
        // Xử lý role từ request, nếu không hợp lệ thì mặc định CUSTOMER
        UserRole role = UserRole.CUSTOMER;
        if (signupReq.getRole() != null) {
            try {
                role = UserRole.valueOf(signupReq.getRole().toUpperCase());
            } catch (Exception ignored) {}
        }
        user.setUserRole(role);
        user.setPassword(bCryptPasswordEncoder.encode(signupReq.getPassword()));
        User createdUser = userRepository.save(user);
        return createdUser.getUserDTO();
    }
}
