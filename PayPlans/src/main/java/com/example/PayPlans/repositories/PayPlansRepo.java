package com.example.PayPlans.repositories;

import com.example.PayPlans.models.PayPlans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayPlansRepo extends JpaRepository<PayPlans, Long> {

    boolean existsByNameIgnoreCase(String name);

}
