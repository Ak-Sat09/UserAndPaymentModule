package com.example.SubscriptionService.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "subscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // from User Service

    private Long planId; // from Plan Service

    private String transactionId; // from Payment Service

    private Instant startDate;

    private Instant endDate;

    @Enumerated(EnumType.STRING)
    private SubscriptionStatus status;
}
