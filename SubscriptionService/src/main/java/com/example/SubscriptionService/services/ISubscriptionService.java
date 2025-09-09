package com.example.SubscriptionService.services;

import com.example.SubscriptionService.dtos.ApiResponseDTO;
import com.example.SubscriptionService.dtos.CreateSubscriptionRequest;
import com.example.SubscriptionService.models.Subscription;

public interface ISubscriptionService {

    // Create subscription after payment success
    com.example.SubscriptionService.dtos.ApiResponseDTO<Subscription> createSubscription(
            CreateSubscriptionRequest request,
            int durationDays);

    // Check if user has active subscription
    ApiResponseDTO<Boolean> isUserSubscribed(Long userId);

    // Expire subscriptions whose endDate passed
    ApiResponseDTO<Void> expireSubscriptions();
}
