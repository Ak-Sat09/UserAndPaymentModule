package com.example.PayPlans.controllers;

import com.example.PayPlans.dtos.ApiResponseDTO;
import com.example.PayPlans.dtos.PayPlanRequestDTO;
import com.example.PayPlans.models.PayPlans;
import com.example.PayPlans.services.PayPlansService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PayPlansController {

    @Autowired
    private PayPlansService payPlansService;

    // Create a new plan
    @PostMapping
    public ApiResponseDTO<PayPlans> createPlan(@RequestBody PayPlanRequestDTO request) {
        return payPlansService.createPlan(request);
    }

    // Get plan by ID
    @GetMapping("/{id}")
    public ApiResponseDTO<PayPlans> getPlanById(@PathVariable Long id) {
        return payPlansService.getPlanById(id);
    }

    // Get all plans
    @GetMapping
    public ApiResponseDTO<List<PayPlans>> getAllPlans() {
        return payPlansService.getAllPlans();
    }

    // Update plan by ID
    @PutMapping("/{id}")
    public ApiResponseDTO<PayPlans> updatePlan(
            @PathVariable Long id,
            @RequestBody PayPlanRequestDTO request) {
        return payPlansService.updatePlan(id, request);
    }

    // Delete plan by ID
    @DeleteMapping("/{id}")
    public ApiResponseDTO<Void> deletePlan(@PathVariable Long id) {
        return payPlansService.deletePlan(id);
    }
}
