package com.example.PayModule.controllers;

import com.example.PayModule.dtos.ApiResponseDTO;
import com.example.PayModule.services.SubscriptionPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PaymentController {

    private final SubscriptionPaymentService paymentService;

    // 1️⃣ Create Razorpay order for a plan
    @PostMapping("/pay")
    public ResponseEntity<ApiResponseDTO<String>> pay(
            @RequestParam Long planId,
            @RequestParam int amountInPaise,
            @RequestParam int durationDays,
            @RequestHeader("Authorization") String token) { // Extract userId from token

        ApiResponseDTO<String> response = paymentService.createOrder(planId, amountInPaise, durationDays, token);
        return ResponseEntity.ok(response);
    }

    // 2️⃣ Verify Razorpay payment and create subscription via Subscription Service
    @PostMapping("/verify")
    public ResponseEntity<ApiResponseDTO<Boolean>> verifyPayment(
            @RequestParam String orderId,
            @RequestParam String paymentId,
            @RequestParam String signature,
            @RequestParam int durationDays,
            @RequestHeader("Authorization") String token) { // Extract userId from token

        ApiResponseDTO<Boolean> response = paymentService.verifyPayment(orderId, paymentId, signature, durationDays,
                token);
        return ResponseEntity.ok(response);
    }
}
