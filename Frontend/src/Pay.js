import React, { useState, useMemo } from "react";

const SUBSCRIPTION_PLANS = {
    monthly: {
        id: 'monthly',
        name: 'Monthly Plan',
        price: 3000,
        originalPrice: 3000,
        duration: 'month',
        badge: null,
        features: [
            'Unlimited Mock Interviews',
            'AI-Powered Feedback',
            'Resume Review',
            'Email Support',
            'Basic Analytics'
        ]
    },
    annual: {
        id: 'annual',
        name: 'Annual Plan',
        price: 36000,
        originalPrice: 36000,
        duration: 'year',
        badge: 'Most Popular',
        features: [
            'Everything in Monthly',
            'Priority Support',
            'Advanced Analytics',
            'Custom Interview Templates',
            'Video Review Sessions',
            '1-on-1 Career Coaching',
            'Industry-specific Prep'
        ]
    }
};

const RazorpayPayment = () => {
    const [email, setEmail] = useState("");
    const [selectedPlan, setSelectedPlan] = useState('annual');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const currentPlan = useMemo(() => SUBSCRIPTION_PLANS[selectedPlan], [selectedPlan]);

    const monthlyEquivalent = useMemo(() => {
        return selectedPlan === 'annual' ? Math.round(currentPlan.price / 12) : currentPlan.price;
    }, [selectedPlan, currentPlan.price]);

    const savings = useMemo(() => {
        if (selectedPlan === 'annual') {
            const monthlyTotal = SUBSCRIPTION_PLANS.monthly.price * 12;
            return monthlyTotal - SUBSCRIPTION_PLANS.annual.price;
        }
        return 0;
    }, [selectedPlan]);

    // Using your EXACT existing backend API without any modifications
    const handlePayment = async () => {
        if (!email) {
            alert("Enter your email!");
            return;
        }

        setIsLoading(true);
        try {
            // Using your EXACT existing API endpoint with same parameters
            const res = await fetch(
                `http://localhost:8082/api/payments/create?email=${email}&amount=${currentPlan.price}`,
                { method: "POST" }
            );
            const data = await res.json();

            if (!data.success) {
                setMessage(data.message);
                setIsLoading(false);
                return;
            }

            const options = {
                key: "rzp_test_qjbBqMLEcOwmiE",
                amount: data.amount,
                currency: data.currency,
                name: `Mock Interview Pro - ${currentPlan.name}`,
                description: `${currentPlan.name} Subscription`,
                order_id: data.orderId,
                handler: async function (response) {
                    // Using your EXACT existing verification API
                    const verifyRes = await fetch(
                        `http://localhost:8082/api/payments/verify?orderId=${response.razorpay_order_id}&paymentId=${response.razorpay_payment_id}&signature=${response.razorpay_signature}&email=${email}`,
                        { method: "POST" }
                    );
                    const verifyData = await verifyRes.json();
                    setMessage(verifyData.message);
                    setIsLoading(false);
                    if (verifyData.success) {
                        setIsSuccess(true);
                        setTimeout(() => {
                            // Using your existing redirect logic
                            window.location.href = "/login";
                        }, 2000); // Using your original 2 second timeout
                    }
                },
                prefill: { email },
                theme: { color: "#3b82f6" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            setMessage("Error initiating payment");
            setIsLoading(false);
        }
    };

    const PlanCard = ({ plan, isSelected, onSelect }) => (
        <div
            onClick={() => !isLoading && !isSuccess && onSelect(plan.id)}
            style={{
                position: 'relative',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                border: `2px solid ${isSelected ? '#3b82f6' : '#e5e7eb'}`,
                cursor: isLoading || isSuccess ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease-in-out',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isSelected
                    ? '0 10px 25px rgba(59, 130, 246, 0.15)'
                    : '0 4px 12px rgba(0, 0, 0, 0.05)',
                opacity: isLoading || isSuccess ? 0.7 : 1
            }}
        >
            {plan.badge && (
                <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: 'white',
                    padding: '4px 16px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
                }}>
                    {plan.badge}
                </div>
            )}

            <div style={{ marginBottom: '16px' }}>
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '8px'
                }}>
                    {plan.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{
                        fontSize: '32px',
                        fontWeight: '800',
                        color: '#1f2937'
                    }}>
                        ₹{plan.price.toLocaleString()}
                    </span>
                    <span style={{
                        fontSize: '16px',
                        color: '#6b7280',
                        fontWeight: '500'
                    }}>
                        /{plan.duration}
                    </span>
                </div>

                {plan.id === 'annual' && savings > 0 && (
                    <div style={{ marginTop: '8px' }}>
                        <span style={{
                            fontSize: '14px',
                            color: '#059669',
                            fontWeight: '600',
                            backgroundColor: '#dcfce7',
                            padding: '2px 8px',
                            borderRadius: '6px'
                        }}>
                            Save ₹{savings.toLocaleString()} per year
                        </span>
                        <div style={{
                            fontSize: '12px',
                            color: '#6b7280',
                            marginTop: '4px'
                        }}>
                            ₹{monthlyEquivalent.toLocaleString()}/month when billed annually
                        </div>
                    </div>
                )}
            </div>

            <div style={{ marginBottom: '20px' }}>
                {plan.features.map((feature, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '8px'
                    }}>
                        <svg
                            style={{
                                width: '16px',
                                height: '16px',
                                color: '#10b981',
                                marginRight: '8px',
                                flexShrink: 0
                            }}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span style={{
                            fontSize: '14px',
                            color: '#4b5563',
                            fontWeight: '500'
                        }}>
                            {feature}
                        </span>
                    </div>
                ))}
            </div>

            {isSelected && (
                <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <svg style={{ width: '14px', height: '14px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            )}
        </div>
    );

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#f8fafc",
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Header - Using your exact existing header */}
            <header style={{
                backgroundColor: "white",
                borderBottom: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <nav style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "64px"
                }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{
                            width: "32px",
                            height: "32px",
                            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <span style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>A</span>
                        </div>
                        <span style={{
                            marginLeft: "12px",
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#1f2937"
                        }}>
                            Anmol Mehla
                        </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                        {["Home", "About", "Features", "Contact", "Profile"].map((link) => (
                            <a key={link} href={`/${link.toLowerCase()}`} style={{
                                color: "#6b7280",
                                textDecoration: "none",
                                fontSize: "14px",
                                fontWeight: "500"
                            }}>
                                {link}
                            </a>
                        ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <a href="/login" style={{
                            color: "#6b7280",
                            textDecoration: "none",
                            padding: "8px 16px",
                            fontSize: "14px",
                            fontWeight: "500"
                        }}>
                            Sign In
                        </a>
                        <a href="/register" style={{
                            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                            color: "white",
                            textDecoration: "none",
                            padding: "8px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            borderRadius: "8px"
                        }}>
                            Sign Up
                        </a>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main style={{
                padding: "48px 20px",
                minHeight: "calc(100vh - 64px)",
                display: "flex",
                justifyContent: "center"
            }}>
                <div style={{ maxWidth: "1000px", width: "100%" }}>
                    {/* Header Section */}
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <div style={{
                            width: "64px",
                            height: "64px",
                            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 24px"
                        }}>
                            <svg style={{ width: "32px", height: "32px", color: "white" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <h1 style={{
                            fontSize: "36px",
                            fontWeight: "800",
                            color: "#1f2937",
                            marginBottom: "16px"
                        }}>
                            Choose Your Plan
                        </h1>
                        <p style={{
                            color: "#6b7280",
                            fontSize: "18px",
                            maxWidth: "600px",
                            margin: "0 auto"
                        }}>
                            Get unlimited access to mock interviews and career coaching.
                            Choose the plan that works best for you.
                        </p>
                    </div>

                    {/* Plan Selection Cards */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "24px",
                        marginBottom: "48px"
                    }}>
                        {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
                            <PlanCard
                                key={plan.id}
                                plan={plan}
                                isSelected={selectedPlan === plan.id}
                                onSelect={setSelectedPlan}
                            />
                        ))}
                    </div>

                    {/* Payment Form - Using your existing form structure */}
                    <div style={{
                        maxWidth: "500px",
                        margin: "0 auto"
                    }}>
                        <div style={{
                            backgroundColor: "white",
                            borderRadius: "16px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                            padding: "32px",
                            border: "1px solid #e5e7eb"
                        }}>
                            <div style={{ marginBottom: "24px" }}>
                                <label htmlFor="email" style={{
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#374151",
                                    marginBottom: "8px"
                                }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading || isSuccess}
                                    placeholder="Enter your email address"
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        border: "1px solid #d1d5db",
                                        borderRadius: "12px",
                                        fontSize: "16px",
                                        backgroundColor: (isLoading || isSuccess) ? "#f3f4f6" : "#f9fafb",
                                        outline: "none",
                                        opacity: (isLoading || isSuccess) ? 0.6 : 1,
                                        boxSizing: "border-box"
                                    }}
                                />
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={isLoading || isSuccess}
                                style={{
                                    width: "100%",
                                    background: (isLoading || isSuccess)
                                        ? "#9ca3af"
                                        : "linear-gradient(135deg, #3b82f6, #6366f1)",
                                    color: "white",
                                    padding: "12px 16px",
                                    borderRadius: "12px",
                                    border: "none",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    cursor: (isLoading || isSuccess) ? "not-allowed" : "pointer",
                                    marginBottom: "24px"
                                }}
                            >
                                {isLoading
                                    ? "Processing..."
                                    : isSuccess
                                        ? "Payment Successful - Redirecting..."
                                        : `Pay ₹${currentPlan.price.toLocaleString()} - ${currentPlan.name}`
                                }
                            </button>

                            {message && (
                                <div style={{
                                    padding: "12px",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    backgroundColor: isSuccess ? "#dcfce7" : "#fef2f2",
                                    color: isSuccess ? "#166534" : "#dc2626",
                                    border: `1px solid ${isSuccess ? "#bbf7d0" : "#fecaca"}`
                                }}>
                                    {message}
                                    {isSuccess && (
                                        <div style={{
                                            marginTop: "8px",
                                            fontSize: "12px",
                                            opacity: 0.8
                                        }}>
                                            Redirecting to login page...
                                        </div>
                                    )}
                                </div>
                            )}

                            <p style={{
                                textAlign: "center",
                                fontSize: "12px",
                                color: "#9ca3af",
                                marginTop: "16px"
                            }}>
                                Secure payment processing. Payment is valid for 60 minutes from the time of purchase.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RazorpayPayment;