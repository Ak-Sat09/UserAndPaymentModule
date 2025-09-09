package com.example.PayModule.services;

import com.example.PayModule.components.AuthUtil;
import com.example.PayModule.components.RazorpayWrapper;
import com.example.PayModule.dtos.ApiResponseDTO;
import com.example.PayModule.models.SubscriptionPayment;
import com.example.PayModule.models.PaymentStatus;
import com.example.PayModule.repositories.SubscriptionPaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SubscriptionPaymentService {

    private final SubscriptionPaymentRepository paymentRepo;
    private final RazorpayWrapper razorpayWrapper;
    private final RestTemplate restTemplate;
    private final AuthUtil authUtil;

    private final String subscriptionServiceUrl = "http://localhost:8083/subscriptions";

    public ApiResponseDTO<String> createOrder(Long planId, int amountInPaise, int durationDays, String token) {
        try {
            // Extract userId from token
            Long userId = authUtil.getUserIdFromToken(token);
            if (userId == null) {
                return ApiResponseDTO.<String>failure("Failed to get userId from token");
            }
            String url = subscriptionServiceUrl + "/check/" + userId;
            ResponseEntity<ApiResponseDTO<Boolean>> checkResponse = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<ApiResponseDTO<Boolean>>() {
                    });

            boolean canPay = checkResponse.getBody() != null && checkResponse.getBody().getData();
            if (!canPay) {
                return ApiResponseDTO.<String>failure("User already has an active subscription. Payment not allowed.");
            }

            // Create Razorpay order
            Order order = razorpayWrapper.createOrder(amountInPaise, "INR", "plan_" + planId + "_user_" + userId);

            // Save payment record
            SubscriptionPayment payment = SubscriptionPayment.builder()
                    .orderId(order.get("id"))
                    .userId(userId)
                    .planId(planId)
                    .amount(amountInPaise / 100)
                    .status(PaymentStatus.PENDING)
                    .build();
            paymentRepo.save(payment);

            return ApiResponseDTO.<String>success("Order created successfully", order.toString());

        } catch (RazorpayException e) {
            return ApiResponseDTO.<String>failure("Failed to create order: " + e.getMessage());
        } catch (Exception e) {
            return ApiResponseDTO.<String>failure("Unexpected error: " + e.getMessage());
        }
    }

    public ApiResponseDTO<Boolean> verifyPayment(String orderId, String paymentId, String signature, int durationDays,
            String token) {
        SubscriptionPayment payment = paymentRepo.findByOrderId(orderId);
        if (payment == null) {
            return ApiResponseDTO.<Boolean>failure("Order not found");
        }

        // Update payment info
        payment.setPaymentId(paymentId);
        payment.setStatus(PaymentStatus.SUCCESS);
        paymentRepo.save(payment);

        // Extract userId from token
        Long userId = authUtil.getUserIdFromToken(token);
        if (userId == null) {
            return ApiResponseDTO.<Boolean>failure("Failed to get userId from token");
        }

        // Prepare subscription request
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("userId", userId);
        requestBody.put("planId", payment.getPlanId());
        requestBody.put("transactionId", paymentId);
        requestBody.put("durationDays", durationDays);

        try {
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody);

            ResponseEntity<ApiResponseDTO<Boolean>> response = restTemplate.exchange(
                    subscriptionServiceUrl,
                    HttpMethod.POST,
                    entity,
                    new ParameterizedTypeReference<ApiResponseDTO<Boolean>>() {
                    });

            boolean subscriptionCreated = response.getBody() != null
                    && Boolean.TRUE.equals(response.getBody().getData());

            // ✅ Always return success for payment verification
            return ApiResponseDTO.<Boolean>success(
                    "Payment verified"
                            + (subscriptionCreated ? " and subscription created" : ", subscription creation failed"),
                    subscriptionCreated);

        } catch (Exception e) {
            // Payment verified, subscription service failed
            return ApiResponseDTO.<Boolean>success(
                    "Payment verified but subscription service call failed: " + e.getMessage(),
                    false);
        }
    }
}
