package com.example.UserService.services.impl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.UserService.dtos.ApiResponseDTO;
import com.example.UserService.dtos.UserRequestDto;
import com.example.UserService.models.UsersEntity;
import com.example.UserService.repositories.UserRepo;
import com.example.UserService.services.UserService;
import com.example.UserService.utils.JwtUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final JwtUtils jwtUtils;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final EmailService emailService;

    @Override
    public ApiResponseDTO<?> register(UserRequestDto request) {
        if (userRepo.findByEmail(request.getEmail()) != null) {
            return ApiResponseDTO.builder()
                    .success(false)
                    .message("Email already exists")
                    .build();
        }

        // 1. Generate token
        String token = UUID.randomUUID().toString();

        // 2. Build user with verification info
        UsersEntity user = UsersEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .verified(false) // default
                .verificationToken(token)
                .tokenExpiry(LocalDateTime.now().plusMinutes(15))
                .build();

        // 3. Save user
        userRepo.save(user);

        // 4. Send email
        String link = "http://localhost:8080/api/users/verify?token=" + token;
        emailService.send(
                user.getEmail(),
                "Verify your account",
                "Hello " + user.getName() + ",\n\nClick the link below to verify your account:\n" + link);

        // 5. Response
        return ApiResponseDTO.builder()
                .success(true)
                .message("User registered successfully. Please check your email to verify your account.")
                .data(null) // ⚠ don’t return password or token
                .build();
    }

    @Override
    public ApiResponseDTO<?> login(UserRequestDto request) {
        UsersEntity user = userRepo.findByEmail(request.getEmail());

        if (user == null) {
            return ApiResponseDTO.builder()
                    .success(false)
                    .message("Invalid email")
                    .build();
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ApiResponseDTO.builder()
                    .success(false)
                    .message("Invalid password")
                    .build();
        }

        if (!user.isVerified()) {
            return ApiResponseDTO.builder()
                    .success(false)
                    .message("Please verify your email before logging in.")
                    .build();
        }

        // Generate JWT token after verification
        String token = jwtUtils.generateToken(
                user.getEmail(),
                String.valueOf(user.getId()),
                user.getRole());

        return ApiResponseDTO.builder()
                .success(true)
                .message("Login successful")
                .data(token)
                .build();
    }

    @Override
    public UserRequestDto updateUserRole(String email, String newRole) {
        UsersEntity user = userRepo.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        user.setRole(newRole);
        UsersEntity updatedUser = userRepo.save(user);

        // map to UserRequestDto for response
        return UserRequestDto.builder()
                .id(updatedUser.getId())
                .name(updatedUser.getName())
                .email(updatedUser.getEmail())
                .password(null) // hide password
                .role(updatedUser.getRole())
                .build();
    }

    @Override
    public ApiResponseDTO<?> verifyAccount(String token) {
        UsersEntity user = userRepo.findByVerificationToken(token);

        if (user == null || user.getTokenExpiry().isBefore(LocalDateTime.now())) {
            return ApiResponseDTO.builder()
                    .success(false)
                    .message("Invalid or expired verification link")
                    .build();
        }

        user.setVerified(true);
        user.setVerificationToken(null);
        user.setTokenExpiry(null);

        userRepo.save(user);

        return ApiResponseDTO.builder()
                .success(true)
                .message("Email verified successfully! You can now login.")
                .build();
    }

}
