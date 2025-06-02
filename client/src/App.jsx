import React from "react";
import { Routes, Route } from "react-router-dom";
import UrlShortener from "./components/UrlShortener";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup"; // create this component
import ProtectedRoute from "./components/auth/ProtectedRoute"; // create this component

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <UrlShortener />
          </ProtectedRoute>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
