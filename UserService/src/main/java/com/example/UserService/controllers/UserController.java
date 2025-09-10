package com.example.UserService.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.UserService.dtos.ApiResponseDTO;
import com.example.UserService.dtos.UserRequestDto;
import com.example.UserService.services.UserService;
import com.example.UserService.utils.JwtUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private final JwtUtils jwtUtils;

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<ApiResponseDTO<?>> register(@Valid @RequestBody UserRequestDto request) {
        ApiResponseDTO<?> response = userService.register(request);
        return ResponseEntity.ok(response);
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<ApiResponseDTO<?>> login(@Valid @RequestBody UserRequestDto request) {
        ApiResponseDTO<?> response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/email")
    public ResponseEntity<ApiResponseDTO<String>> getEmail(
            @RequestHeader("Authorization") String tokenHeader) {

        if (tokenHeader == null || tokenHeader.isEmpty()) {
            throw new RuntimeException("Invalid token");
        }

        // Remove 'Bearer ' prefix
        String token = tokenHeader.startsWith("Bearer ") ? tokenHeader.substring(7).trim() : tokenHeader.trim();

        String email = jwtUtils.getEmailFromToken(token);

        ApiResponseDTO<String> response = ApiResponseDTO.<String>builder()
                .success(true)
                .message("Email extracted successfully")
                .data(email)
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/userid")
    public ResponseEntity<ApiResponseDTO<String>> getUserId(
            @RequestHeader("Authorization") String tokenHeader) {

        if (tokenHeader == null || tokenHeader.isEmpty()) {
            throw new RuntimeException("Invalid token");
        }

        // Remove 'Bearer ' prefix
        String token = tokenHeader.startsWith("Bearer ") ? tokenHeader.substring(7).trim() : tokenHeader.trim();

        String userId = jwtUtils.getUserIdFromToken(token);

        ApiResponseDTO<String> response = ApiResponseDTO.<String>builder()
                .success(true)
                .message("UserId extracted successfully")
                .data(userId)
                .build();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/update-role")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ApiResponseDTO<UserRequestDto>> updateUserRole(
            @Valid @RequestBody UserRequestDto request) {

        UserRequestDto updatedUser = userService.updateUserRole(request.getEmail(), request.getRole());

        return ResponseEntity.ok(
                ApiResponseDTO.<UserRequestDto>builder()
                        .success(true)
                        .message("Role updated successfully")
                        .data(updatedUser)
                        .build());
    }

    @GetMapping("/verify")
    public ResponseEntity<ApiResponseDTO<?>> verifyEmail(@RequestParam String token) throws Exception {
        ApiResponseDTO<?> response = userService.verifyAccount(token);
        return ResponseEntity.ok(response);
    }

}
