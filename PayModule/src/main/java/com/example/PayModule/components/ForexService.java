package com.example.PayModule.components;

import org.springframework.stereotype.Component;

@Component
public class ForexService {

    /**
     * Converts a given amount from user currency to INR.
     * 
     * @param fromCurrency user currency (USD, EUR, etc.)
     * @param amount       amount in user currency
     * @return amount in INR
     */
    public double convertToINR(String fromCurrency, double amount) {
        double rate;

        switch (fromCurrency.toUpperCase()) {
            case "USD":
                rate = 83.0;
                break; // 1 USD = 83 INR
            case "EUR":
                rate = 90.0;
                break; // 1 EUR = 90 INR
            case "INR":
                rate = 1.0;
                break; // already INR
            default:
                throw new RuntimeException("Currency conversion not supported: " + fromCurrency);
        }

        return amount * rate;
    }
}
