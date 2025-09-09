package com.example.PayPlans.models;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "pay_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayPlans {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Auto-incremented ID

    @Column(nullable = false, unique = true, length = 80)
    private String name;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    // List of description lines
    @ElementCollection
    @CollectionTable(name = "plan_descriptions", joinColumns = @JoinColumn(name = "plan_id"))
    @Column(name = "line", nullable = false, length = 255)
    private List<String> description;

    // duration in days
    @Column(nullable = false)
    private Integer durationDays;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist
    void prePersist() {
        createdAt = Instant.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    void preUpdate() {
        updatedAt = Instant.now();
    }
}
