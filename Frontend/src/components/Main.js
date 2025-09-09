import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const PlansPage = () => {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buying, setBuying] = useState(false);

    const token = localStorage.getItem("token");

    const userId = localStorage.getItem("userId"); // fetch dynamically


    // Fetch plans from Plan Service (8081)
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/plans");
                if (response.data.success) setPlans(response.data.data);
                else toast.error("Failed to fetch plans: " + response.data.message);
            } catch (err) {
                console.error(err);
                toast.error("Error fetching plans");
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    // Buy Now click
    const buyNow = async () => {
        if (!selectedPlan) return toast.error("Select a plan first");
        setBuying(true);

        try {
            const response = await axios.post(
                "http://localhost:8082/api/payments/pay",
                null,
                {
                    params: {
                        userId,
                        planId: selectedPlan.id,
                        amountInPaise: selectedPlan.price * 100,
                        durationDays: selectedPlan.durationDays
                    },
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (!response.data.success) {
                setBuying(false);
                return toast.error("Failed to create payment: " + response.data.message);
            }

            const orderData = JSON.parse(response.data.data);

            const options = {
                key: "rzp_test_qjbBqMLEcOwmiE",
                amount: selectedPlan.price * 100,
                currency: "INR",
                name: selectedPlan.name,
                description: `Subscription for ${selectedPlan.durationDays} days`,
                order_id: orderData.id,
                handler: async function (paymentResponse) {
                    try {
                        const verifyRes = await axios.post(
                            "http://localhost:8082/api/payments/verify",
                            null,
                            {
                                params: {
                                    orderId: paymentResponse.razorpay_order_id,
                                    paymentId: paymentResponse.razorpay_payment_id,
                                    signature: paymentResponse.razorpay_signature,
                                    durationDays: selectedPlan.durationDays
                                },
                                headers: { Authorization: `Bearer ${token}` }
                            }
                        );

                        if (verifyRes.data.success && verifyRes.data.data) {
                            toast.success("Payment successful & subscription activated!");
                        } else if (verifyRes.data.success) {
                            toast.error("Payment successful but subscription activation failed!");
                        } else {
                            toast.error("Payment verification failed!");
                        }
                    } catch (err) {
                        console.error(err);
                        toast.error("Error verifying payment: " + err.message);
                    } finally {
                        setBuying(false);
                    }
                },
                prefill: { name: "John Doe", email: "johndoe@example.com" },
                theme: { color: "#3b82f6" } // Updated to match your theme
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            setBuying(false);
            toast.error(" Something went wrong during payment.");
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '48px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    minWidth: '300px'
                }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        animation: 'pulse 2s ease-in-out infinite'
                    }}>
                        <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: '8px'
                    }}>
                        Loading Plans
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
                        Please wait while we fetch the latest plans...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Header */}
            <header style={{
                backgroundColor: 'white',
                borderBottom: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
                <nav style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '64px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>A</span>
                        </div>
                        <span style={{
                            marginLeft: '12px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#1f2937'
                        }}>
                            Anmol Mehla
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        <a href="/" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>Home</a>
                        <a href="/about" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>About</a>
                        <a href="/features" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>Features</a>
                        <a href="/plans" style={{
                            color: '#3b82f6',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '600'
                        }}>Plans</a>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <a href="/login" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            padding: '8px 16px',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>Sign In</a>
                        <a href="/register" style={{
                            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                            color: 'white',
                            textDecoration: 'none',
                            padding: '8px 16px',
                            fontSize: '14px',
                            fontWeight: '500',
                            borderRadius: '8px'
                        }}>Sign Up</a>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main style={{
                padding: '48px 20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Page Header */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px'
                    }}>
                        <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: '16px'
                    }}>
                        Available Plans
                    </h1>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '18px',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Select the perfect plan for your needs. Upgrade or downgrade at any time.
                    </p>
                </div>

                {/* Plans Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '32px',
                    marginBottom: '48px'
                }}>
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan)}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '32px',
                                border: selectedPlan?.id === plan.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                                boxShadow: selectedPlan?.id === plan.id ? '0 20px 40px rgba(59, 130, 246, 0.15)' : '0 10px 25px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                transform: selectedPlan?.id === plan.id ? 'translateY(-4px)' : 'translateY(0)'
                            }}
                        >
                            {selectedPlan?.id === plan.id && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-1px',
                                    right: '24px',
                                    background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '0 0 12px 12px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Selected
                                </div>
                            )}

                            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                <h3 style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#1f2937',
                                    marginBottom: '8px'
                                }}>
                                    {plan.name}
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                    <span style={{
                                        fontSize: '32px',
                                        fontWeight: 'bold',
                                        color: '#3b82f6'
                                    }}>
                                        ₹{plan.price}
                                    </span>
                                    <span style={{
                                        fontSize: '16px',
                                        color: '#6b7280',
                                        marginTop: '8px'
                                    }}>
                                        /{plan.durationDays} days
                                    </span>
                                </div>
                            </div>

                            <div style={{
                                padding: '16px',
                                backgroundColor: '#f9fafb',
                                borderRadius: '12px',
                                marginBottom: '24px'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}>
                                    <svg style={{ width: '16px', height: '16px', color: '#10b981' }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span style={{
                                        fontSize: '14px',
                                        color: '#374151',
                                        fontWeight: '500'
                                    }}>
                                        {plan.durationDays} days access
                                    </span>
                                </div>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <h4 style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#374151',
                                    marginBottom: '12px'
                                }}>
                                    Features included:
                                </h4>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0
                                }}>
                                    {plan.description.map((feature, idx) => (
                                        <li key={idx} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            marginBottom: '8px'
                                        }}>
                                            <svg style={{ width: '16px', height: '16px', color: '#10b981', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span style={{
                                                fontSize: '14px',
                                                color: '#4b5563'
                                            }}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div style={{
                                borderTop: '1px solid #e5e7eb',
                                paddingTop: '16px',
                                textAlign: 'center'
                            }}>
                                <span style={{
                                    fontSize: '12px',
                                    color: selectedPlan?.id === plan.id ? '#3b82f6' : '#9ca3af',
                                    fontWeight: '500'
                                }}>
                                    {selectedPlan?.id === plan.id ? 'Ready to purchase' : 'Click to select'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Buy Now Section */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '32px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    {selectedPlan ? (
                        <div>
                            <div style={{ marginBottom: '24px' }}>
                                <h3 style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: '#1f2937',
                                    marginBottom: '8px'
                                }}>
                                    Ready to get started?
                                </h3>
                                <p style={{
                                    color: '#6b7280',
                                    fontSize: '16px'
                                }}>
                                    You've selected <span style={{ fontWeight: '600', color: '#3b82f6' }}>{selectedPlan.name}</span> plan for ₹{selectedPlan.price}
                                </p>
                            </div>

                            <button
                                onClick={buyNow}
                                disabled={buying}
                                style={{
                                    background: buying ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                    color: 'white',
                                    padding: '16px 32px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: buying ? 'not-allowed' : 'pointer',
                                    boxShadow: buying ? 'none' : '0 8px 20px rgba(59, 130, 246, 0.3)',
                                    transition: 'all 0.3s ease',
                                    minWidth: '200px'
                                }}
                            >
                                {buying ? "Processing..." : "Buy Now"}
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                backgroundColor: '#f3f4f6',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px'
                            }}>
                                <svg style={{ width: '24px', height: '24px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '8px'
                            }}>
                                Select a plan to continue
                            </h3>
                            <p style={{
                                color: '#6b7280',
                                fontSize: '14px'
                            }}>
                                Choose one of the plans above to proceed with your purchase
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PlansPage;