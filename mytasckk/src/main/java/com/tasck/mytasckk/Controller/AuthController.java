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
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JWTService jwtService;  // JWT Service for generating tokens

    @Autowired
    private AuthenticationManager authManager;  // Authentication Manager for authenticating users

    @Autowired
    private userRepository userRepository;  // User repository for interacting with the database

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();  // Password encoder for hashing

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody user loginRequest) {
        try {
            // Find user by email
            Optional<user> optionalUser = userRepository.findByEmail(loginRequest.getEmail());

            if (optionalUser.isPresent()) {
                user foundUser = optionalUser.get();

                // Check if the provided password matches the stored password
                if (encoder.matches(loginRequest.getPassword(), foundUser.getPassword())) {
                    // Authenticate the user
                    Authentication authentication = authManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    foundUser.getEmail(),
                                    loginRequest.getPassword()
                            )
                    );

                    // Generate JWT token
                    String token = jwtService.generateToken((UserDetails) authentication.getPrincipal());
                    return ResponseEntity.ok(new Response("success", "Login successful", token));
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response("error", "Incorrect password", null));
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response("error", "User not found", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response("error", "An error occurred: " + e.getMessage(), null));
        }
    }

    // Signup endpoint
    @PostMapping("/register")
    public ResponseEntity<?> signupUser(@RequestBody user newUser) {
        try {
            // Check if user with the same email already exists
            Optional<user> existingUser = userRepository.findByEmail(newUser.getEmail());

            if (existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response("error", "Email is already registered", null));
            }

            // Encode the password before saving the new user
            newUser.setPassword(encoder.encode(newUser.getPassword()));

            // Save the user to the database
            user savedUser = userRepository.save(newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(new Response("success", "User registered successfully", savedUser.getEmail()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response("error", "Registration failed: " + e.getMessage(), null));
        }
    }

    // Response wrapper class to structure the response data
    static class Response {
        private String status;
        private String message;
        private String data;

        public Response(String status, String message, String data) {
            this.status = status;
            this.message = message;
            this.data = data;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getData() {
            return data;
        }

        public void setData(String data) {
            this.data = data;
        }
    }
}
