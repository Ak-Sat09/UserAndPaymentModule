import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Features = () => {
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
                }}>Features</h2>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}>
                    {[
                        "Mock Interviews with Experts",
                        "Instant Feedback & Analytics",
                        "Resume Review & Guidance",
                        "Job Recommendations",
                    ].map((feature, idx) => (
                        <div key={idx} style={{
                            backgroundColor: "white",
                            borderRadius: "16px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                            border: "1px solid #e5e7eb",
                            padding: "32px",
                            textAlign: "center"
                        }}>
                            <h3 style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#1f2937"
                            }}>{feature}</h3>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Features;
