package com.example.PayModule.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "razorpay")
@Data
public class RazorpayConfig {

    private String keyId;
    private String keySecret;

}
