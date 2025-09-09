import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Profile = () => {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "system-ui" }}>
            <Header />
            <main style={{ maxWidth: "600px", margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
                <div style={{ backgroundColor: "white", padding: "32px", borderRadius: "16px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb" }}>
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "white", fontSize: "32px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                        A
                    </div>
                    <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Anmol Mehla</h2>
                    <p style={{ color: "#6b7280", marginBottom: "24px" }}>Student | Future SDE | DSA Professor</p>
                    <button style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "white", padding: "12px 24px", borderRadius: "12px", fontSize: "16px", fontWeight: "600", border: "none", cursor: "pointer" }}>
                        Edit Profile
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
