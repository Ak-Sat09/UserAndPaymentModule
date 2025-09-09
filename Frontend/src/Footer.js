import React from 'react'

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '48px 20px 24px'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '32px',
                    marginBottom: '32px'
                }}>
                    {/* Company Info */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
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
                            <span style={{ marginLeft: '12px', fontSize: '20px', fontWeight: 'bold' }}>Anmol Mehla</span>
                        </div>
                        <p style={{
                            color: '#d1d5db',
                            marginBottom: '16px',
                            lineHeight: '1.6'
                        }}>
                            Building the future of digital experiences with innovative solutions
                            that empower businesses and individuals to achieve their goals.
                        </p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                                <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                                <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                            Quick Links
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <a href="/" style={{
                                color: '#d1d5db',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}>Home</a>
                            <a href="/about" style={{
                                color: '#d1d5db',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}>About Us</a>
                            <a href="/features" style={{
                                color: '#d1d5db',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}>Features</a>
                            <a href="/pricing" style={{
                                color: '#d1d5db',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}>Pricing</a>
                            <a href="/contact" style={{
                                color: '#d1d5db',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}>Contact</a>
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                            Support
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <a href="/help" style={{
                                color: '#d1d5db',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}>Help Center</a>
                            <a href="/privacy" style={{
                                color: '#d1d5db',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}>Privacy Policy</a>
                            <a href="/terms" style={{
                                color: '#d1d5db',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}>Terms of Service</a>
                            <a href="/faq" style={{
                                color: '#d1d5db',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}>FAQ</a>
                            <a href="/support" style={{
                                color: '#d1d5db',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}>Support</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div style={{
                    borderTop: '1px solid #374151',
                    paddingTop: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
                        © 2025 All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <a href="/privacy" style={{
                            color: '#9ca3af',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}>Privacy</a>
                        <a href="/terms" style={{
                            color: '#9ca3af',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}>Terms</a>
                        <a href="/cookies" style={{
                            color: '#9ca3af',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}>Cookies</a>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer