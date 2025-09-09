import React, { useState } from "react";

const UpdatePlan = () => {
    const [id, setId] = useState("");
    const [plan, setPlan] = useState({
        name: "",
        price: "",
        description: "",
        durationDays: ""
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [success, setSuccess] = useState(false);
    const [found, setFound] = useState(false);

    const handleFetchPlan = async () => {
        if (!id.trim()) {
            alert("Please enter a Plan ID");
            return;
        }

        setFetching(true);
        try {
            // Simulate API call to fetch plan by ID
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock data - replace with actual fetch
            const mockPlan = {
                name: "Premium Plan",
                price: "199",
                description: "Premium features with advanced analytics",
                durationDays: "60"
            };

            setPlan(mockPlan);
            setFound(true);
            console.log("Plan fetched for ID:", id);
        } catch (error) {
            alert("Error fetching plan: " + error.message);
            setFound(false);
        } finally {
            setFetching(false);
        }
    };

    const handleUpdate = async () => {
        if (!id.trim()) {
            alert("Please enter a Plan ID first");
            return;
        }

        setLoading(true);
        try {
            // Simulate API call - replace with axios.put
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("Plan updated:", { id, ...plan });

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            alert("Error updating plan: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setPlan(prev => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
        setId("");
        setPlan({ name: "", price: "", description: "", durationDays: "" });
        setFound(false);
        setSuccess(false);
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
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                }}>
                    <svg style={{ width: '28px', height: '28px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </div>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                    Update Plan
                </h1>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>
                    Modify existing plan details in your system
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
                        Plan updated successfully!
                    </span>
                </div>
            )}

            {/* Main Container */}
            <div style={{
                maxWidth: '500px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                overflow: 'hidden'
            }}>
                {/* ID Search Section */}
                <div style={{
                    padding: '24px',
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb'
                }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                        Plan ID
                    </label>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="Enter Plan ID to update"
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                        <button
                            onClick={handleFetchPlan}
                            disabled={fetching || !id.trim()}
                            style={{
                                padding: '12px 20px',
                                backgroundColor: fetching || !id.trim() ? '#9ca3af' : '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: fetching || !id.trim() ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                minWidth: '100px',
                                justifyContent: 'center'
                            }}
                            onMouseOver={(e) => {
                                if (!fetching && id.trim()) e.target.style.backgroundColor = '#2563eb';
                            }}
                            onMouseOut={(e) => {
                                if (!fetching && id.trim()) e.target.style.backgroundColor = '#3b82f6';
                            }}
                        >
                            {fetching ? (
                                <>
                                    <div style={{
                                        width: '14px',
                                        height: '14px',
                                        border: '2px solid #ffffff40',
                                        borderTop: '2px solid #ffffff',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                    Loading
                                </>
                            ) : (
                                <>
                                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Fetch
                                </>
                            )}
                        </button>
                    </div>

                    {found && (
                        <div style={{
                            marginTop: '12px',
                            padding: '8px 12px',
                            backgroundColor: '#dbeafe',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <svg style={{ width: '16px', height: '16px', color: '#3b82f6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span style={{ fontSize: '12px', color: '#1e40af', fontWeight: '500' }}>
                                Plan found! You can now edit the details below.
                            </span>
                        </div>
                    )}
                </div>

                {/* Form Section */}
                <div style={{ padding: '32px' }}>
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
                            disabled={!found}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease',
                                backgroundColor: !found ? '#f9fafb' : 'white',
                                cursor: !found ? 'not-allowed' : 'text'
                            }}
                            onFocus={(e) => found && (e.target.style.borderColor = '#3b82f6')}
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
                                disabled={!found}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease',
                                    backgroundColor: !found ? '#f9fafb' : 'white',
                                    cursor: !found ? 'not-allowed' : 'text'
                                }}
                                onFocus={(e) => found && (e.target.style.borderColor = '#3b82f6')}
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
                                disabled={!found}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s ease',
                                    backgroundColor: !found ? '#f9fafb' : 'white',
                                    cursor: !found ? 'not-allowed' : 'text'
                                }}
                                onFocus={(e) => found && (e.target.style.borderColor = '#3b82f6')}
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
                            disabled={!found}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease',
                                resize: 'vertical',
                                fontFamily: 'inherit',
                                backgroundColor: !found ? '#f9fafb' : 'white',
                                cursor: !found ? 'not-allowed' : 'text'
                            }}
                            onFocus={(e) => found && (e.target.style.borderColor = '#3b82f6')}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={handleUpdate}
                            disabled={loading || !found}
                            style={{
                                flex: 1,
                                padding: '14px',
                                backgroundColor: loading || !found ? '#9ca3af' : '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: loading || !found ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: loading || !found ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)'
                            }}
                            onMouseOver={(e) => {
                                if (!loading && found) e.target.style.backgroundColor = '#2563eb';
                            }}
                            onMouseOut={(e) => {
                                if (!loading && found) e.target.style.backgroundColor = '#3b82f6';
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
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Update Plan
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleReset}
                            style={{
                                padding: '14px 20px',
                                backgroundColor: '#f3f4f6',
                                color: '#374151',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Info Note */}
                <div style={{
                    margin: '0 32px 32px',
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
                        Replace simulation with axios.get() for fetch and axios.put() for update
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

export default UpdatePlan;