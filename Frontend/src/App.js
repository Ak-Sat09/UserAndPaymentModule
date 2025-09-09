import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Home1 from "./Home1";
import "./App.css";
import About from "./About";
import Features from "./Feature";
import Profile from "./Profile";
import Main from "./components/Main";
import Contact from "./Contact";
import AdminDashboard from "./admin/AdminDashboard";
import CreatePlan from "./admin/Create";
import UpdatePlan from "./admin/Update";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />



      <Routes>

        {/* Step 3: Register */}
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home1 />} />


        <Route path="/profile" element={<Profile />} />


        <Route path="/features" element={<Features />} />

        <Route path="/contact" element={<Contact />} />


        <Route path="/about" element={<About />} />

        <Route path="/create" element={<CreatePlan />} />

        <Route path="/login" element={<Login />} />

        <Route path="/main" element={<Home />} />

        <Route path="/upgrade" element={<Main />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/update" element={<UpdatePlan />} />
      </Routes>
    </>
  );
}

export default App;
