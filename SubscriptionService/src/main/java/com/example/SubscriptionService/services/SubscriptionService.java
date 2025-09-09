package com.example.SubscriptionService.services;

import com.example.SubscriptionService.dtos.ApiResponseDTO;
import com.example.SubscriptionService.dtos.CreateSubscriptionRequest;
import com.example.SubscriptionService.models.Subscription;
import com.example.SubscriptionService.models.SubscriptionStatus;
import com.example.SubscriptionService.repositories.SubscriptionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService implements ISubscriptionService {

    private final SubscriptionRepo subscriptionRepo;

    @Override
    public ApiResponseDTO<Subscription> createSubscription(CreateSubscriptionRequest request, int durationDays) {
        Instant now = Instant.now();

        Subscription subscription = Subscription.builder()
                .userId(request.getUserId())
                .planId(request.getPlanId())
                .transactionId(request.getTransactionId())
                .startDate(now)
                .endDate(now.plus(durationDays, ChronoUnit.DAYS))
                .status(SubscriptionStatus.ACTIVE)
                .build();

        subscriptionRepo.save(subscription);

        return ApiResponseDTO.<Subscription>builder()
                .success(true)
                .message("Subscription created successfully")
                .data(subscription)
                .build();
    }

    @Override
    public ApiResponseDTO<Boolean> isUserSubscribed(Long userId) {
        List<Subscription> activeSubs = subscriptionRepo.findByUserIdAndStatus(userId, SubscriptionStatus.ACTIVE);

        boolean hasActiveSubscription = activeSubs.stream()
                .anyMatch(sub -> sub.getEndDate().isAfter(Instant.now()));

        // Flip logic: if already subscribed → return false (can't pay)
        boolean canPay = !hasActiveSubscription;

        return ApiResponseDTO.<Boolean>builder()
                .success(true)
                .message(canPay ? "User can pay for subscription" : "User already has an active subscription")
                .data(canPay)
                .build();
    }

    @Override
    public ApiResponseDTO<Void> expireSubscriptions() {
        subscriptionRepo.findAll().forEach(sub -> {
            if (sub.getEndDate().isBefore(Instant.now()) && sub.getStatus() == SubscriptionStatus.ACTIVE) {
                sub.setStatus(SubscriptionStatus.INACTIVE);
                subscriptionRepo.save(sub);
            }
        });

        return ApiResponseDTO.<Void>builder()
                .success(true)
                .message("Expired subscriptions updated successfully")
                .data(null)
                .build();
    }
}
