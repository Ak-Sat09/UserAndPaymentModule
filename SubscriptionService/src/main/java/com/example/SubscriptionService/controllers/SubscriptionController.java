package com.example.SubscriptionService.controllers;

import com.example.SubscriptionService.dtos.ApiResponseDTO;
import com.example.SubscriptionService.dtos.CreateSubscriptionRequest;
import com.example.SubscriptionService.services.ISubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subscriptions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SubscriptionController {

    private final ISubscriptionService subscriptionService;

    // Create subscription (called by Payment Service after payment success)
    @PostMapping
    public ApiResponseDTO<Boolean> create(@RequestBody CreateSubscriptionRequest request) {
        try {
            int durationDays = request.getDurationDays();
            subscriptionService.createSubscription(request, durationDays); // save in DB
            return ApiResponseDTO.<Boolean>builder()
                    .success(true)
                    .message("Subscription created successfully")
                    .data(true)
                    .build();
        } catch (Exception e) {
            return ApiResponseDTO.<Boolean>builder()
                    .success(false)
                    .message("Failed to create subscription: " + e.getMessage())
                    .data(false)
                    .build();
        }
    }

    // Check if user has active subscription
    @GetMapping("/check/{userId}")
    public ApiResponseDTO<Boolean> check(@PathVariable Long userId) {
        return subscriptionService.isUserSubscribed(userId);
    }
}
