package com.example.PayModule.repositories;

import com.example.PayModule.models.SubscriptionPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface SubscriptionPaymentRepository extends JpaRepository<SubscriptionPayment, Long> {

    SubscriptionPayment findByOrderId(String orderId);

    Optional<SubscriptionPayment> findByPaymentId(String paymentId);

    List<SubscriptionPayment> findByUserId(Long userId);

    Optional<SubscriptionPayment> findByUserIdAndPlanId(Long userId, Long planId);
}
