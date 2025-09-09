import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Contact = () => {
    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#f8fafc",
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            display: "flex",
            flexDirection: "column"
        }}>
            <Header />

            <main style={{ flex: 1, padding: "48px 20px" }}>
                <h2 style={{
                    textAlign: "center",
                    marginBottom: "2rem",
                    color: "#334155",
                    fontSize: "28px",
                    fontWeight: "bold"
                }}>Contact Us</h2>

                <div style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    border: "1px solid #e5e7eb",
                    padding: "32px"
                }}>
                    <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            style={{
                                padding: "12px 16px",
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                fontSize: "16px"
                            }}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            style={{
                                padding: "12px 16px",
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                fontSize: "16px"
                            }}
                        />
                        <textarea
                            placeholder="Your Message"
                            rows="5"
                            style={{
                                padding: "12px 16px",
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                fontSize: "16px",
                                resize: "none"
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                                color: "white",
                                padding: "12px 16px",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer"
                            }}
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
