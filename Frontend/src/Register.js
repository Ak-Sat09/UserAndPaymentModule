import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [message, setMessage] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      alert("Error: Please fill all fields!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Error: Please enter a valid email address!");
      return;
    }

    if (form.password.length < 6) {
      alert("Error: Password must be at least 6 characters long!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        // redirect to /pay
        navigate("/login");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again!");

    } finally {
      setIsLoading(false);
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 20px',
        minHeight: 'calc(100vh - 64px - 280px)'
      }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
          {/* Form Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              Create Account
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              Join us and start your journey
            </p>
          </div>

          {/* Form Container */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            padding: '32px',
            border: '1px solid #e5e7eb'
          }}>
            <form onSubmit={handleSubmit} noValidate>

              {/* Name Field */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="name" style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 48px',
                      border: '1px solid #d1d5db',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: '#f9fafb',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }}>
                    <svg style={{ width: '20px', height: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="email" style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 48px',
                      border: '1px solid #d1d5db',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: '#f9fafb',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }}>
                    <svg style={{ width: '20px', height: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: '8px' }}>
                <label htmlFor="password" style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    style={{
                      width: '100%',
                      padding: '12px 48px 12px 48px',
                      border: '1px solid #d1d5db',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: '#f9fafb',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }}>
                    <svg style={{ width: '20px', height: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    {showPassword ? (
                      <svg style={{ width: '20px', height: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg style={{ width: '20px', height: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                marginBottom: '24px'
              }}>
                Must be at least 6 characters long
              </p>


              {/* Divider */}
              <div style={{
                margin: '32px 0',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  right: '0',
                  height: '1px',
                  backgroundColor: '#e5e7eb'
                }}></div>
                <span style={{
                  backgroundColor: 'white',
                  color: '#9ca3af',
                  fontSize: '12px',
                  padding: '0 16px'
                }}>
                  Or continue with
                </span>
              </div>

              {/* Social Login Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button style={{
                  flex: 1,
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
              </div>

              <div style={{
                margin: '32px 0',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  right: '0',
                  height: '1px',
                  backgroundColor: '#e5e7eb'
                }}></div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
              {message && (
                <p style={{ color: "red", marginTop: "12px", textAlign: "center" }}>
                  {message}
                </p>
              )}

            </form>

            {/* Login Link */}
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                Already have an account?{" "}
                <a href="/login" style={{
                  color: '#3b82f6',
                  fontWeight: '600',
                  textDecoration: 'underline'
                }}>
                  Sign in here
                </a>
              </p>
            </div>
          </div>



          {/* Footer Text */}
          <p style={{
            textAlign: 'center',
            fontSize: '12px',
            color: '#9ca3af',
            marginTop: '16px'
          }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div >
      </main >

      {/* Footer */}
      < footer style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '48px 20px 24px'
      }
      }>
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
      </footer >
    </div >
  );
}