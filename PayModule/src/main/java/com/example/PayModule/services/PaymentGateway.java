package com.example.PayModule.services;

import com.example.PayModule.dtos.ApiResponseDTO;

public interface PaymentGateway {

    ApiResponseDTO<String> createOrder(Long couponId, int amount, String currency, String token);

    ApiResponseDTO<Boolean> verifySignature(String orderId, String paymentId, String signature);
}
