package com.example.PayPlans.services.implementations;

import com.example.PayPlans.dtos.ApiResponseDTO;
import com.example.PayPlans.dtos.PayPlanRequestDTO;
import com.example.PayPlans.models.PayPlans;
import com.example.PayPlans.repositories.PayPlansRepo;
import com.example.PayPlans.services.PayPlansService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PayPlansServiceImpl implements PayPlansService {

    @Autowired
    private PayPlansRepo payPlansRepo;

    @Override
    public ApiResponseDTO<PayPlans> createPlan(PayPlanRequestDTO request) {
        PayPlans plan = PayPlans.builder()
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .durationDays(request.getDurationDays())
                .build();

        PayPlans savedPlan = payPlansRepo.save(plan);

        return ApiResponseDTO.<PayPlans>builder()
                .success(true)
                .message("Plan created successfully")
                .data(savedPlan)
                .build();
    }

    @Override
    public ApiResponseDTO<PayPlans> getPlanById(Long id) {
        Optional<PayPlans> planOpt = payPlansRepo.findById(id);

        if (planOpt.isPresent()) {
            return ApiResponseDTO.<PayPlans>builder()
                    .success(true)
                    .message("Plan fetched successfully")
                    .data(planOpt.get())
                    .build();
        }

        return ApiResponseDTO.<PayPlans>builder()
                .success(false)
                .message("Plan not found with ID: " + id)
                .data(null)
                .build();
    }

    @Override
    public ApiResponseDTO<List<PayPlans>> getAllPlans() {
        List<PayPlans> plans = payPlansRepo.findAll();

        return ApiResponseDTO.<List<PayPlans>>builder()
                .success(true)
                .message("All plans fetched successfully")
                .data(plans)
                .build();
    }

    @Override
    public ApiResponseDTO<PayPlans> updatePlan(Long id, PayPlanRequestDTO request) {
        Optional<PayPlans> planOpt = payPlansRepo.findById(id);

        if (planOpt.isPresent()) {
            PayPlans plan = planOpt.get();
            plan.setName(request.getName());
            plan.setPrice(request.getPrice());
            plan.setDescription(request.getDescription());
            plan.setDurationDays(request.getDurationDays());

            PayPlans updatedPlan = payPlansRepo.save(plan);

            return ApiResponseDTO.<PayPlans>builder()
                    .success(true)
                    .message("Plan updated successfully")
                    .data(updatedPlan)
                    .build();
        }

        return ApiResponseDTO.<PayPlans>builder()
                .success(false)
                .message("Plan not found with ID: " + id)
                .data(null)
                .build();
    }

    @Override
    public ApiResponseDTO<Void> deletePlan(Long id) {
        Optional<PayPlans> planOpt = payPlansRepo.findById(id);

        if (planOpt.isPresent()) {
            payPlansRepo.deleteById(id);
            return ApiResponseDTO.<Void>builder()
                    .success(true)
                    .message("Plan deleted successfully")
                    .data(null)
                    .build();
        }

        return ApiResponseDTO.<Void>builder()
                .success(false)
                .message("Plan not found with ID: " + id)
                .data(null)
                .build();
    }
}
