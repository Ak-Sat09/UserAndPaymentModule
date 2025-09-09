package com.example.PayModule.components;

import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class ReceiptIdGenerator {

    /**
     * Generates a unique receiptId for Razorpay
     *
     * @param userId   ID of the user making payment
     * @param couponId ID of the coupon/product
     * @return unique receipt ID
     */
    public String generate(Long userId, Long couponId) {
        long timestamp = Instant.now().toEpochMilli(); // current milliseconds
        return "rcpt_" + userId + "_" + couponId + "_" + timestamp;
    }
}
