package com.example.SubscriptionService.repositories;

import com.example.SubscriptionService.models.Subscription;
import com.example.SubscriptionService.models.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionRepo extends JpaRepository<Subscription, Long> {

    // Find active subscription for a user
    List<Subscription> findByUserIdAndStatus(Long userId, SubscriptionStatus status);

}
