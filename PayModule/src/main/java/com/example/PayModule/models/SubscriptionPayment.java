package com.example.PayModule.models;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "subscription_payments", indexes = {
        @Index(name = "idx_user_plan", columnList = "userId,planId")
})
public class SubscriptionPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String orderId; // Razorpay order ID

    @Column(unique = true, length = 100)
    private String paymentId; // Razorpay payment ID (nullable until paid)

    @Column(nullable = false)
    private Long userId; // user who made payment

    @Column(nullable = false)
    private Long planId; // plan user bought

    @Column(nullable = false)
    private int amount; // in paise

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PaymentStatus status; // PENDING / SUCCESS / FAILED

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
