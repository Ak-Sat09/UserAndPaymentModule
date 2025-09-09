package com.example.PayPlans.services;

import com.example.PayPlans.dtos.ApiResponseDTO;
import com.example.PayPlans.dtos.PayPlanRequestDTO;
import com.example.PayPlans.models.PayPlans;

import java.util.List;

public interface PayPlansService {

    ApiResponseDTO<PayPlans> createPlan(PayPlanRequestDTO request);

    ApiResponseDTO<PayPlans> getPlanById(Long id);

    ApiResponseDTO<List<PayPlans>> getAllPlans();

    ApiResponseDTO<PayPlans> updatePlan(Long id, PayPlanRequestDTO request);

    ApiResponseDTO<Void> deletePlan(Long id);
}
