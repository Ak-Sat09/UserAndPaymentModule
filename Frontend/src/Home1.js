import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
    const features = [
        {
            id: 1,
            title: "Notes & Resources",
            description: "Access high-quality study notes, DSA sheets, and interview prep material.",
            icon: "📘",
        },
        {
            id: 2,
            title: "Coding Tests",
            description: "Practice coding challenges with real-time compiler & detailed solutions.",
            icon: "💻",
        },
        {
            id: 3,
            title: "Mock Interviews",
            description: "Book mock interviews with industry experts to sharpen your skills.",
            icon: "🎤",
        },
        {
            id: 4,
            title: "Career Roadmaps",
            description: "Structured career paths for SDE roles, with milestones and guidance.",
            icon: "🛣️",
        },
        {
            id: 5,
            title: "Live Courses",
            description: "Interactive live sessions, mentorship, and community discussions.",
            icon: "🎓",
        },
    ];

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "system-ui" }}>
            <Header />

            {/* Hero Section */}
            <section
                style={{
                    textAlign: "center",
                    padding: "80px 20px",
                    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                    color: "white",
                }}
            >
                <h1 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "16px" }}>
                    Master DSA & Crack Your Dream Job 🚀
                </h1>
                <p style={{ fontSize: "18px", maxWidth: "700px", margin: "0 auto 30px" }}>
                    Learn from notes, solve coding problems, attempt mock tests, and practice interviews – all in one platform.
                </p>
                <a
                    href="/register"
                    style={{
                        background: "white",
                        color: "#3b82f6",
                        padding: "14px 28px",
                        borderRadius: "12px",
                        fontWeight: "600",
                        fontSize: "16px",
                        textDecoration: "none",
                    }}
                >
                    Get Started
                </a>
            </section>

            {/* Features Section */}
            <section style={{ maxWidth: "1200px", margin: "60px auto", padding: "0 20px" }}>
                <h2 style={{ textAlign: "center", fontSize: "32px", fontWeight: "bold", marginBottom: "40px", color: "#1f2937" }}>
                    Why Choose Us?
                </h2>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "24px",
                    }}
                >
                    {features.map((f) => (
                        <div
                            key={f.id}
                            style={{
                                background: "white",
                                padding: "24px",
                                borderRadius: "16px",
                                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                                border: "1px solid #e5e7eb",
                                textAlign: "center",
                                transition: "transform 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                        >
                            <div style={{ fontSize: "36px", marginBottom: "12px" }}>{f.icon}</div>
                            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#1f2937" }}>{f.title}</h3>
                            <p style={{ color: "#6b7280", marginTop: "8px" }}>{f.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section
                style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    backgroundColor: "white",
                    borderTop: "1px solid #e5e7eb",
                }}
            >
                <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px", color: "#1f2937" }}>
                    Ready to Start Learning?
                </h2>
                <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "24px" }}>
                    Join thousands of learners preparing for FAANG and top tech companies.
                </p>
                <a
                    href="/register"
                    style={{
                        background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                        color: "white",
                        padding: "14px 28px",
                        borderRadius: "12px",
                        fontWeight: "600",
                        fontSize: "16px",
                        textDecoration: "none",
                    }}
                >
                    Join Now
                </a>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
