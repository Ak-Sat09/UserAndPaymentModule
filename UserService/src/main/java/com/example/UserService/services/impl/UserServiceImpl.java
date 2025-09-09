package com.example.UserService.services.impl;

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

    @Override
    public ApiResponseDTO<?> register(UserRequestDto request) {
        if (userRepo.findByEmail(request.getEmail()) != null) {
            return ApiResponseDTO.builder()
                    .success(false)
                    .message("Email already exists")
                    .build();
        }

        UsersEntity user = UsersEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();

        userRepo.save(user);

        return ApiResponseDTO.builder()
                .success(true)
                .message("User registered successfully")
                .data(user)
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

        String token = jwtUtils.generateToken(
                user.getEmail(),
                String.valueOf(user.getId()),
                user.getRole() // 👈 now pass role
        );

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
}
