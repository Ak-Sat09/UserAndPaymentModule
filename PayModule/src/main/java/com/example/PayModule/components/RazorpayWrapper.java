package com.example.PayModule.components;

import org.json.JSONObject;
import org.springframework.stereotype.Component;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@Component
public class RazorpayWrapper {

    // 🔑 Hardcoded Razorpay Test Credentials
    private static final String KEY_ID = "rzp_test_qjbBqMLEcOwmiE";
    private static final String KEY_SECRET = "Dg8L3j9QFJYpZDkUqNkDvklk";

    public Order createOrder(int amountInPaise, String currency, String receiptId) throws RazorpayException {
        // ✅ Initialize client with hardcoded keys
        RazorpayClient client = new RazorpayClient(KEY_ID, KEY_SECRET);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amountInPaise); // already in paise
        orderRequest.put("currency", currency); // INR
        orderRequest.put("receipt", receiptId);
        orderRequest.put("payment_capture", 1);

        return client.orders.create(orderRequest);
    }
}
