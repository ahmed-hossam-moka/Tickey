package com.tickey.services.Auth;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.tickey.entites.User;
import com.tickey.entites.enums.UserRole;
import com.tickey.repositorys.UserRepository;
import com.tickey.services.Auth.DTOs.LoginRequest;
import com.tickey.services.Auth.DTOs.LoginResponse;
import com.tickey.services.Auth.DTOs.RegisterRequest;
import com.tickey.services.Auth.DTOs.RegisterResponse;

@Service
public class AuthService {
    public AuthService() {
    }

    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  PasswordEncoder passwordEncoder;


    public ResponseEntity<?>  register( RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already used");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.CUSTOMER); 
        user.setPhoneNumber(request.getPhoneNumber());
        
        User savedUser = userRepository.save(user);

        RegisterResponse response = new RegisterResponse(
            "Account created successfully",
            savedUser.getId(),
            savedUser.getEmail(),
            savedUser.getName(),
            savedUser.getRole()
        );

        return ResponseEntity.ok(response);
    }

    
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        System.out.println(userOptional);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        User user = userOptional.get();
        System.out.println(user);
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        LoginResponse response = new LoginResponse(
            "Login successful",
            user.getId(),
            user.getEmail(),
            user.getName(),
            user.getRole()
        );

        return ResponseEntity.ok(response);
    }

       public ResponseEntity<?> registerAdmin(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already used");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.ADMIN);
        user.setPhoneNumber(request.getPhoneNumber());
        
        User savedUser = userRepository.save(user);

        RegisterResponse response = new RegisterResponse(
            "Admin account created successfully",
            savedUser.getId(),
            savedUser.getEmail(),
            savedUser.getName(),
            savedUser.getRole()
        );

        return ResponseEntity.ok(response);
    }
}