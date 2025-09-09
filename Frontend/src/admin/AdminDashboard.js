import React, { useState } from "react";

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState(null);

    const handleCreate = () => {
        setActiveSection('create');
        console.log('Create button clicked');
        // Will navigate to Create component
    };

    const handleUpdate = () => {
        setActiveSection('update');
        console.log('Update button clicked');
        // Will navigate to Update component
    };

    const handleDelete = () => {
        setActiveSection('delete');
        console.log('Delete button clicked');
        // Will navigate to Delete component
    };

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
                            <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <span style={{
                            marginLeft: '12px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#1f2937'
                        }}>
                            Admin Dashboard
                        </span>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <span style={{
                            color: '#6b7280',
                            fontSize: '14px'
                        }}>
                            Welcome, Admin
                        </span>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#e5e7eb',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>A</span>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main style={{
                padding: '64px 20px',
                maxWidth: '1200px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                {/* Dashboard Header */}
                <div style={{ marginBottom: '64px' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 32px'
                    }}>
                        <svg style={{ width: '40px', height: '40px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>

                    <h1 style={{
                        fontSize: '48px',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: '16px',
                        background: 'linear-gradient(135deg, #1f2937, #3b82f6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Admin Control Panel
                    </h1>

                    <p style={{
                        color: '#6b7280',
                        fontSize: '20px',
                        maxWidth: '600px',
                        margin: '0 auto',
                        lineHeight: '1.6'
                    }}>
                        Manage your application with powerful CRUD operations.
                        Choose an action below to get started.
                    </p>
                </div>

                {/* CRUD Buttons Container */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '32px',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {/* Create Button */}
                    <div
                        onClick={handleCreate}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            padding: '48px 32px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: activeSection === 'create' ? '2px solid #10b981' : '1px solid #e5e7eb',
                            boxShadow: activeSection === 'create'
                                ? '0 25px 50px rgba(16, 185, 129, 0.15)'
                                : '0 10px 25px rgba(0, 0, 0, 0.08)',
                            transform: activeSection === 'create' ? 'translateY(-8px)' : 'translateY(0)'
                        }}
                        onMouseEnter={(e) => {
                            if (activeSection !== 'create') {
                                e.target.style.transform = 'translateY(-4px)';
                                e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeSection !== 'create') {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
                            }
                        }}
                    >
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        }}>
                            <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>

                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#1f2937',
                            marginBottom: '12px'
                        }}>
                            CREATE
                        </h2>

                        <p style={{
                            color: '#6b7280',
                            fontSize: '16px',
                            lineHeight: '1.5',
                            marginBottom: '20px'
                        }}>
                            Add new records, plans, or entities to your system with ease.
                        </p>

                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#10b981',
                            fontSize: '14px',
                            fontWeight: '600'
                        }}>
                            <span>Get Started</span>
                            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Update Button */}
                    <div
                        onClick={handleUpdate}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            padding: '48px 32px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: activeSection === 'update' ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                            boxShadow: activeSection === 'update'
                                ? '0 25px 50px rgba(59, 130, 246, 0.15)'
                                : '0 10px 25px rgba(0, 0, 0, 0.08)',
                            transform: activeSection === 'update' ? 'translateY(-8px)' : 'translateY(0)'
                        }}
                        onMouseEnter={(e) => {
                            if (activeSection !== 'update') {
                                e.target.style.transform = 'translateY(-4px)';
                                e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeSection !== 'update') {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
                            }
                        }}
                    >
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        }}>
                            <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>

                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#1f2937',
                            marginBottom: '12px'
                        }}>
                            UPDATE
                        </h2>

                        <p style={{
                            color: '#6b7280',
                            fontSize: '16px',
                            lineHeight: '1.5',
                            marginBottom: '20px'
                        }}>
                            Modify existing records and keep your data current and accurate.
                        </p>

                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#3b82f6',
                            fontSize: '14px',
                            fontWeight: '600'
                        }}>
                            <span>Get Started</span>
                            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Delete Button */}
                    <div
                        onClick={handleDelete}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            padding: '48px 32px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            border: activeSection === 'delete' ? '2px solid #ef4444' : '1px solid #e5e7eb',
                            boxShadow: activeSection === 'delete'
                                ? '0 25px 50px rgba(239, 68, 68, 0.15)'
                                : '0 10px 25px rgba(0, 0, 0, 0.08)',
                            transform: activeSection === 'delete' ? 'translateY(-8px)' : 'translateY(0)'
                        }}
                        onMouseEnter={(e) => {
                            if (activeSection !== 'delete') {
                                e.target.style.transform = 'translateY(-4px)';
                                e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeSection !== 'delete') {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
                            }
                        }}
                    >
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px'
                        }}>
                            <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>

                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#1f2937',
                            marginBottom: '12px'
                        }}>
                            DELETE
                        </h2>

                        <p style={{
                            color: '#6b7280',
                            fontSize: '16px',
                            lineHeight: '1.5',
                            marginBottom: '20px'
                        }}>
                            Remove outdated or unwanted records safely from your system.
                        </p>

                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#ef4444',
                            fontSize: '14px',
                            fontWeight: '600'
                        }}>
                            <span>Get Started</span>
                            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Active Section Indicator */}
                {activeSection && (
                    <div style={{
                        marginTop: '48px',
                        padding: '24px',
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px'
                        }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: activeSection === 'create' ? '#10b981' :
                                    activeSection === 'update' ? '#3b82f6' : '#ef4444',
                                borderRadius: '50%',
                                animation: 'pulse 2s ease-in-out infinite'
                            }}></div>
                            <span style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#1f2937'
                            }}>
                                {activeSection.toUpperCase()} mode activated
                            </span>
                        </div>

                        <p style={{
                            color: '#6b7280',
                            fontSize: '14px',
                            margin: '8px 0 0 0'
                        }}>
                            Ready to navigate to {activeSection} functionality
                        </p>
                    </div>
                )}
            </main>

            <style>
                {`
                    @keyframes pulse {
                        0%, 100% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0.5;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default AdminDashboard;