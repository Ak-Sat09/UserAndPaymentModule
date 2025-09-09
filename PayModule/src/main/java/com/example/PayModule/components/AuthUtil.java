package com.example.PayModule.components;

import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class AuthUtil {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String userServiceUrl = "http://localhost:8080/api/users/userid";

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public Long getUserIdFromToken(String token) {
        try {
            // Ensure token has "Bearer " prefix
            String authHeader = token.startsWith("Bearer ") ? token : "Bearer " + token;

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", authHeader);
            HttpEntity<Void> entity = new HttpEntity<>(headers);

            // Call User microservice
            ResponseEntity<Map> response = restTemplate.exchange(
                    userServiceUrl,
                    HttpMethod.GET,
                    entity,
                    Map.class);

            Map<String, Object> body = response.getBody();
            if (body != null && body.get("data") != null) {
                return Long.parseLong(body.get("data").toString());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
