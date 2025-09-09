import React from "react";

const Header = () => {
    return (
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
                    <a href="/contact" style={{
                        color: '#6b7280',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>Contact</a>
                    <a href="/profile" style={{
                        color: '#6b7280',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>Profile</a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <a href="/login" style={{
                        color: '#3b82f6',
                        textDecoration: 'none',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        borderRadius: '8px',
                        backgroundColor: '#eff6ff'
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
    );
};

export default Header;
