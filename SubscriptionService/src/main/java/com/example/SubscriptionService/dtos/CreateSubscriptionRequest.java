package com.example.SubscriptionService.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateSubscriptionRequest {
    private Long userId;
    private Long planId;
    private String transactionId;
    private int durationDays;
}