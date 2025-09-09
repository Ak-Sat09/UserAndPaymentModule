# Payment Microservice

This service manages **Payment Plans** and **Subscriptions** using **Razorpay**. It is part of a **microservices architecture**. Only **Admin** can create payment plans. Users can subscribe to plans, and subscriptions are automatically marked **inactive** after completion.

---

## Features

- **Admin Only Payment Plan Management**: Create, update, delete payment plans.
- **Razorpay Integration**: Secure online payments.
- **Subscription Management**:
  - Users can subscribe to plans.
  - Subscriptions automatically expire after the plan duration.
  - Active and inactive subscriptions tracked separately.
- **JWT & Role-Based Security**: Only authenticated users can subscribe, Admin-only operations for plans.
- **Microservices Ready**: Works independently and can be integrated with other services (User Service, Notification Service, etc.).

---

## Endpoints

### Payment Plan Management (Admin Only)
- `POST /api/payments/plans` – Create a new payment plan  
- `PUT /api/payments/plans/{id}` – Update a payment plan  
- `DELETE /api/payments/plans/{id}` – Delete a payment plan  
- `GET /api/payments/plans` – List all payment plans  

### Subscriptions (Users)
- `POST /api/payments/subscribe` – Subscribe to a plan via Razorpay  
- `GET /api/payments/subscriptions` – List all user subscriptions  
- `GET /api/payments/subscriptions/active` – List active subscriptions  
- `GET /api/payments/subscriptions/inactive` – List expired/inactive subscriptions  

---

## Tech Stack

- **Backend:** Java Spring Boot  
- **Payment Gateway:** Razorpay  
- **Database:** MySQL / MongoDB  
- **Security:** JWT & Role-Based Access Control  
- **Architecture:** Microservices (Payment Service + Subscription Service)

---

## Subscription Logic

1. User selects a payment plan.  
2. Payment is processed using **Razorpay**.  
3. Upon successful payment, a **subscription record** is created with:
   - `startDate` = current date  
   - `endDate` = startDate + plan duration  
   - `status` = ACTIVE  
4. After `endDate`, subscription is automatically marked **INACTIVE**.  
 
