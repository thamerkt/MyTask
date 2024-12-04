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
    private JWTService jwtService; // JWT Service for generating tokens

    @Autowired
    private AuthenticationManager authManager; // Authentication Manager for authenticating users

    @Autowired
    private userRepository userRepository; // User repository for interacting with the database

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(); // Password encoder for hashing

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
                    return ResponseEntity.ok(token);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during authentication: " + e.getMessage());
        }
    }

    // Signup endpoint
    @PostMapping("/register")
    public ResponseEntity<?> signupUser(@RequestBody user newUser) {
        try {
            // Check if user with the same email already exists
            Optional<user> existingUser = userRepository.findByEmail(newUser.getEmail());

            if (existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already used");
            }

            // Encode the password before saving the new user
            newUser.setPassword(encoder.encode(newUser.getPassword()));

            // Save the user to the database
            user savedUser = userRepository.save(newUser);

            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed: " + e.getMessage());
        }
    }
}
