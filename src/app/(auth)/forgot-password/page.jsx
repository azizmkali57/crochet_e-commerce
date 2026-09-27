"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiArrowLeft, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send reset link.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sage-light/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#3D5938]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container / Modal Card */}
      <div className="relative w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl shadow-soft border border-sage-light/60 overflow-hidden grid grid-cols-1 md:grid-cols-12 z-10 transition-all duration-300">
        
        {/* Left Side: Brand & Visual Info */}
        <div className="md:col-span-5 bg-gradient-to-br from-cream-light via-cream to-sage-light/40 p-8 sm:p-10 flex flex-col justify-between items-center text-center border-b md:border-b-0 md:border-r border-sage-light/60 relative overflow-hidden">
          {/* Subtle Background Pattern Circle */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/40 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-sage/30 rounded-full blur-xl pointer-events-none" />

          {/* Top Logo & Title */}
          <div className="flex flex-col items-center w-full z-10">
            <Link href="/" className="group flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-md ring-4 ring-white/80 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/images/main_logo.png"
                  alt="Crochet Alif"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-script text-3xl sm:text-4xl text-primary block">
                  Crochet Alif
                </span>
                <span className="text-[11px] tracking-widest uppercase font-medium text-warm/80">
                  Handmade with Love
                </span>
              </div>
            </Link>
          </div>

          {/* Middle Story / Quote */}
          <div className="my-8 z-10 hidden sm:block">
            <div className="p-4 rounded-2xl bg-white/60 border border-white/80 shadow-sm backdrop-blur-xs">
              <p className="font-heading italic text-primary text-base sm:text-lg mb-1">
                "We’ve got you covered."
              </p>
              <p className="text-xs text-warm">
                Reset your password safely and get back to browsing unique handmade creations.
              </p>
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="flex items-center gap-2 text-xs text-warm z-10">
            <FaHeart className="text-rose-400 animate-pulse" />
            <span>Secure & Safe Account Recovery</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            
            {/* Form Header */}
            <div className="text-center md:text-left mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl text-primary font-bold tracking-tight">
                Forgot Password?
              </h2>
              <p className="text-sm text-warm mt-1">
                Enter your email address and we'll send you an instruction link to reset your password.
              </p>
            </div>

            {submitted ? (
              <div className="bg-cream-light/60 border border-sage/60 p-6 rounded-2xl text-center animate-fade-in">
                <FiCheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-heading text-xl text-primary font-bold mb-1">Check Your Email</h3>
                <p className="text-sm text-warm mb-6">
                  We've sent password reset instructions to <br/>
                  <span className="font-semibold text-primary">{email}</span>
                </p>
                <div className="space-y-3">
                  <Link
                    href="/reset-password"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition shadow-button"
                  >
                    Enter Reset Code / New Password <FiArrowRight />
                  </Link>
                  <div>
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 text-xs text-warm hover:text-primary font-medium transition"
                    >
                      <FiArrowLeft /> Back to Login
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
                    {error}
                  </div>
                )}
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    Registered Email Address
                  </label>
                  <div className="relative rounded-xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                      <FiMail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-cream-light/40 border border-sage/60 rounded-xl text-sm text-primary placeholder-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-primary hover:bg-primary-dark active:scale-[0.99] text-white font-medium rounded-xl shadow-button hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <FiArrowRight size={16} />
                    </>
                  )}
                </button>

                {/* Back to Login link */}
                <div className="text-center pt-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-warm hover:text-primary transition"
                  >
                    <FiArrowLeft size={16} /> Back to Sign In
                  </Link>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* Footer copyright subtle text */}
      <div className="absolute bottom-3 text-center w-full text-[11px] text-warm/70">
        © {new Date().getFullYear()} Crochet Alif. Handcrafted with love.
      </div>
    </div>
  );
}
