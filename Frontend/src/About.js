import React from "react";
import Header from "./Header";
import Footer from "./Footer"

const About = () => {
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
                }}>About Us</h2>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}>
                    {[
                        { title: "Our Mission", content: "To provide top quality mock interview opportunities." },
                        { title: "Our Vision", content: "Empower developers worldwide to land their dream job." },
                        { title: "Our Team", content: "Passionate professionals with tech & mentoring experience." }
                    ].map((item, idx) => (
                        <div key={idx} style={{
                            backgroundColor: "white",
                            borderRadius: "16px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                            border: "1px solid #e5e7eb",
                            padding: "32px",
                            textAlign: "center"
                        }}>
                            <h3 style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#1f2937",
                                marginBottom: "16px"
                            }}>{item.title}</h3>
                            <p style={{ fontSize: "16px", color: "#6b7280" }}>{item.content}</p>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default About;
