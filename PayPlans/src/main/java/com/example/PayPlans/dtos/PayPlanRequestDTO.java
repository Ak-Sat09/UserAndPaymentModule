package com.example.PayPlans.dtos;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayPlanRequestDTO {

    private String name;
    private BigDecimal price;
    private List<String> description;
    private Integer durationDays;
}
