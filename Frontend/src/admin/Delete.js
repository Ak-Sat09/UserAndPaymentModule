import React, { useState } from "react";

const DeletePlan = () => {
    const [id, setId] = useState("");
    const [planDetails, setPlanDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fetchingPlan, setFetchingPlan] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleFetchPlan = async () => {
        if (!id.trim()) {
            alert("Please enter a valid Plan ID");
            return;
        }

        setFetchingPlan(true);
        try {
            // Simulate fetch API call - replace with your axios call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock data - replace with actual API response
            const mockPlan = {
                id: id,
                name: "Premium Plan",
                price: 199,
                description: "Advanced features with priority support",
                durationDays: 60
            };

            setPlanDetails(mockPlan);
        } catch (error) {
            alert("Error fetching plan: " + error.message);
            setPlanDetails(null);
        } finally {
            setFetchingPlan(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            // Simulate API call - replace with your axios call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("Plan deleted:", id);

            setSuccess(true);
            setPlanDetails(null);
            setId("");
            setShowConfirmation(false);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            alert("Error deleting plan: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const openConfirmation = () => {
        if (!planDetails) {
            alert("Please fetch plan details first");
            return;
        }
        setShowConfirmation(true);
    };

    const closeConfirmation = () => {
        setShowConfirmation(false);
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
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                }}>
                    <svg style={{ width: '28px', height: '28px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                    Delete Plan
                </h1>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>
                    Permanently remove a plan from the system
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
                        Plan deleted successfully!
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
                padding: '32px'
            }}>
                {/* Plan ID Section */}
                <div style={{
                    padding: '20px',
                    backgroundColor: '#fef2f2',
                    borderRadius: '12px',
                    marginBottom: '24px',
                    border: '1px solid #fecaca'
                }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#991b1b', marginBottom: '8px' }}>
                        Plan ID to Delete
                    </label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="Enter plan ID"
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                border: '1px solid #fca5a5',
                                borderRadius: '8px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease',
                                backgroundColor: 'white'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#ef4444'}
                            onBlur={(e) => e.target.style.borderColor = '#fca5a5'}
                        />
                        <button
                            onClick={handleFetchPlan}
                            disabled={fetchingPlan || !id.trim()}
                            style={{
                                padding: '12px 20px',
                                backgroundColor: fetchingPlan || !id.trim() ? '#9ca3af' : '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: fetchingPlan || !id.trim() ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                minWidth: '100px',
                                justifyContent: 'center'
                            }}
                        >
                            {fetchingPlan ? (
                                <>
                                    <div style={{
                                        width: '14px',
                                        height: '14px',
                                        border: '2px solid #ffffff40',
                                        borderTop: '2px solid #ffffff',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Find
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Plan Details Display */}
                {planDetails && (
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '12px',
                        marginBottom: '24px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <h3 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#1f2937',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <svg style={{ width: '16px', height: '16px', color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Plan Details
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
                            <div>
                                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Name</span>
                                <p style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600', margin: '4px 0 0 0' }}>
                                    {planDetails.name}
                                </p>
                            </div>
                            <div>
                                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Price</span>
                                <p style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600', margin: '4px 0 0 0' }}>
                                    ₹{planDetails.price}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
                            <div>
                                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Duration</span>
                                <p style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600', margin: '4px 0 0 0' }}>
                                    {planDetails.durationDays} days
                                </p>
                            </div>
                            <div>
                                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>ID</span>
                                <p style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600', margin: '4px 0 0 0' }}>
                                    #{planDetails.id}
                                </p>
                            </div>
                        </div>

                        <div>
                            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Description</span>
                            <p style={{ fontSize: '14px', color: '#1f2937', margin: '4px 0 0 0' }}>
                                {planDetails.description}
                            </p>
                        </div>
                    </div>
                )}

                {/* Delete Button */}
                <button
                    onClick={openConfirmation}
                    disabled={!planDetails}
                    style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: !planDetails ? '#9ca3af' : '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: !planDetails ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: !planDetails ? 'none' : '0 4px 12px rgba(239, 68, 68, 0.3)'
                    }}
                    onMouseOver={(e) => {
                        if (planDetails) e.target.style.backgroundColor = '#dc2626';
                    }}
                    onMouseOut={(e) => {
                        if (planDetails) e.target.style.backgroundColor = '#ef4444';
                    }}
                >
                    <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Plan
                </button>

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
                        Replace simulation with axios.delete(`http://localhost:8081/api/plans/${id}`)
                    </p>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '32px',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
                    }}>
                        <div style={{
                            textAlign: 'center',
                            marginBottom: '24px'
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 16px'
                            }}>
                                <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>

                            <h2 style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#1f2937',
                                marginBottom: '8px'
                            }}>
                                Confirm Deletion
                            </h2>

                            <p style={{
                                color: '#6b7280',
                                fontSize: '14px',
                                marginBottom: '16px'
                            }}>
                                Are you sure you want to delete "{planDetails?.name}"? This action cannot be undone.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={closeConfirmation}
                                disabled={loading}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    backgroundColor: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: loading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    backgroundColor: loading ? '#fca5a5' : '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px'
                                }}
                            >
                                {loading ? (
                                    <>
                                        <div style={{
                                            width: '16px',
                                            height: '16px',
                                            border: '2px solid #ffffff40',
                                            borderTop: '2px solid #ffffff',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }} />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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

export default DeletePlan;