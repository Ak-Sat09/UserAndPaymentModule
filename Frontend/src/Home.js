import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const sampleJobs = [
      { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote", popular: false },
      { id: 2, title: "Backend Developer", company: "CodeWorks", location: "Bangalore", popular: true },
      { id: 3, title: "Fullstack Developer", company: "DevSolutions", location: "Mumbai", popular: false },
    ];
    setJobs(sampleJobs);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8fafc",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
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

            <a href="/upgrade" style={{
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '8px'
            }}>Upgrade</a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "40px 20px" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#334155",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Available Jobs
        </h2>

        {/* Jobs Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: job.popular
                  ? "0 15px 35px rgba(0,0,0,0.2)"
                  : "0 10px 25px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                padding: "32px",
                position: "relative",
                textAlign: "center",
              }}
            >
              {job.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "-12px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  Popular
                </div>
              )}
              <div style={{ marginBottom: "16px" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#1f2937",
                  }}
                >
                  {job.title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "16px",
                  color: "#6b7280",
                  marginBottom: "8px",
                }}
              >
                <strong>Company:</strong> {job.company}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#6b7280",
                  marginBottom: "24px",
                }}
              >
                <strong>Location:</strong> {job.location}
              </p>
              <button
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  background: job.popular
                    ? "linear-gradient(135deg, #3b82f6, #6366f1)"
                    : "#f3f4f6",
                  color: job.popular ? "white" : "#1f2937",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  if (!job.popular) e.target.style.background = "#e5e7eb";
                }}
                onMouseLeave={(e) => {
                  if (!job.popular) e.target.style.background = "#f3f4f6";
                }}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
