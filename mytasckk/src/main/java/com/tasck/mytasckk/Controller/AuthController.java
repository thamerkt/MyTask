package com.tasck.mytasckk.Controller;

import com.tasck.mytasckk.Repository.userRepository;
import com.tasck.mytasckk.Entity.user;
import com.tasck.mytasckk.Service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JWTService jwtService; // JWT Service for generating tokens

    @Autowired
    private AuthenticationManager authManager; // Authentication Manager for authenticating users

    @Autowired
    private userRepository userRepository; // User repository for interacting with the database

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(); // Password encoder for hashing

    // Login endpoint
    @PostMapping("register")
    public ResponseEntity<?> registerUser(@Validated @RequestBody user user, BindingResult result) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (result.hasErrors()) {
                response.put("message", "Validation error");
                return ResponseEntity.badRequest().body(response);
            }

            // Check if user already exists
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                response.put("status", "error");
                response.put("message", "User with this email already exists");
                return ResponseEntity.badRequest().body(response);
            }

            // Encrypt password and save the user
            user.setPassword(encoder.encode(user.getPassword()));
            userRepository.save(user);

            response.put("message", "User registered successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "An unexpected error occurred: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    // Login route with try-catch, JSON response, and JWT token generation
    @PostMapping("login")
    public ResponseEntity<?> loginUser(@RequestBody user loginRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            Optional<user> userOptional = userRepository.findByEmail(loginRequest.getEmail());

            if (userOptional.isEmpty()) {
                response.put("status", "error");
                response.put("message", "User not found");
                return ResponseEntity.status(404).body(response);
            }

            user user = userOptional.get();

            // Validate the password
            if (!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
                response.put("status", "error");
                response.put("message", "Invalid credentials");
                return ResponseEntity.status(401).body(response);
            }

            // Generate JWT token after successful login
            String token = jwtService.generateToken(user,user.getId()); // Using JWTService to generate the token

            // Successful login response with JWT token
            response.put("status", "success");
            response.put("message", "Login successful");
            response.put("user", user.getEmail());  // Optionally: Return user email or ID for reference
            response.put("token", token);  // Include the JWT token in the response
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "An unexpected error occurred: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
