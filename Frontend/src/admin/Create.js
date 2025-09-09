import React, { useState } from "react";

const CreatePlan = () => {
    const [plan, setPlan] = useState({
        name: "",
        price: "",
        description: "",
        durationDays: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call - replace with your axios call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("Plan created:", plan);

            setSuccess(true);
            setPlan({ name: "", price: "", description: "", durationDays: "" });
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            alert("Error creating plan: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setPlan(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            padding: '40px 20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Header */}
            <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                }}>
                    <svg style={{ width: '28px', height: '28px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                    Create New Plan
                </h1>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>
                    Add a new subscription plan to your system
                </p>
            </div>

            {/* Success Message */}
            {success && (
                <div style={{
                    maxWidth: '500px',
                    margin: '0 auto 24px',
                    padding: '16px',
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #10b981',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <svg style={{ width: '20px', height: '20px', color: '#10b981' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span style={{ color: '#065f46', fontSize: '14px', fontWeight: '500' }}>
                        Plan created successfully!
                    </span>
                </div>
            )}

            {/* Form Container */}
            <div style={{
                maxWidth: '500px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                padding: '32px'
            }}>
                <div onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                            Plan Name
                        </label>
                        <input
                            type="text"
                            value={plan.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter plan name"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#10b981'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                    </div>

                    {/* Price and Duration Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                                Price (₹)
                            </label>
                            <input
                                type="number"
                                value={plan.price}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                placeholder="0"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#10b981'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                                Duration (Days)
                            </label>
                            <input
                                type="number"
                                value={plan.durationDays}
                                onChange={(e) => handleInputChange('durationDays', e.target.value)}
                                placeholder="30"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#10b981'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>
                    </div>

                    {/* Description Field */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                            Description
                        </label>
                        <textarea
                            value={plan.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Describe the plan features..."
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease',
                                resize: 'vertical',
                                fontFamily: 'inherit'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#10b981'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            backgroundColor: loading ? '#9ca3af' : '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: loading ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.3)'
                        }}
                        onMouseOver={(e) => {
                            if (!loading) e.target.style.backgroundColor = '#059669';
                        }}
                        onMouseOut={(e) => {
                            if (!loading) e.target.style.backgroundColor = '#10b981';
                        }}
                    >
                        {loading ? (
                            <>
                                <div style={{
                                    width: '18px',
                                    height: '18px',
                                    border: '2px solid #ffffff40',
                                    borderTop: '2px solid #ffffff',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                Creating...
                            </>
                        ) : (
                            <>
                                <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create Plan
                            </>
                        )}
                    </button>
                </div>

                {/* Info Note */}
                <div style={{
                    marginTop: '20px',
                    padding: '12px',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '8px',
                    border: '1px solid #bae6fd'
                }}>
                    <p style={{
                        fontSize: '12px',
                        color: '#0369a1',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Replace the simulation with axios.post("http://localhost:8081/api/plans", plan)
                    </p>
                </div>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default CreatePlan;