"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle, FiShield } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    code: searchParams?.get("code") || "",
    token: searchParams?.get("token") || "",
    email: searchParams?.get("email") || "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const codeParam = searchParams?.get("code");
    const tokenParam = searchParams?.get("token");
    const emailParam = searchParams?.get("email");
    if (codeParam || tokenParam || emailParam) {
      setFormData((prev) => ({
        ...prev,
        code: codeParam || prev.code,
        token: tokenParam || prev.token,
        email: emailParam || prev.email,
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: formData.code,
          token: formData.token,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to update password. Please try again.");
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
                "Keep your account safe & secure."
              </p>
              <p className="text-xs text-warm">
                Create a strong password with letters, numbers, and symbols.
              </p>
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="flex items-center gap-2 text-xs text-warm z-10">
            <FaHeart className="text-rose-400 animate-pulse" />
            <span>Encrypted & Safe Credentials</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            
            {/* Form Header */}
            <div className="text-center md:text-left mb-8">
              <h2 className="font-heading text-2xl sm:text-3xl text-primary font-bold tracking-tight">
                Reset Password
              </h2>
              <p className="text-sm text-warm mt-1">
                Set a new password for your Crochet Alif account.
              </p>
            </div>

            {success ? (
              <div className="bg-cream-light border border-sage p-6 rounded-2xl text-center animate-fade-in">
                <FiCheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-heading text-xl text-primary font-bold mb-1">Password Changed!</h3>
                <p className="text-sm text-warm mb-4">Your password has been successfully updated.</p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition shadow-button"
                >
                  Sign In With New Password <FiArrowRight />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
                    {error}
                  </div>
                )}

                {/* Reset Code Field */}
                <div>
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    Verification Code
                  </label>
                  <div className="relative rounded-xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                      <FiShield size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="Enter 6-digit code sent to email"
                      className="w-full pl-10 pr-4 py-3 bg-cream-light/40 border border-sage/60 rounded-xl text-sm text-primary placeholder-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    New Password
                  </label>
                  <div className="relative rounded-xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                      <FiLock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-10 py-3 bg-cream-light/40 border border-sage/60 rounded-xl text-sm text-primary placeholder-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted hover:text-primary transition"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    Confirm Password
                  </label>
                  <div className="relative rounded-xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                      <FiLock size={18} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      className="w-full pl-10 pr-10 py-3 bg-cream-light/40 border border-sage/60 rounded-xl text-sm text-primary placeholder-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted hover:text-primary transition"
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 px-4 bg-primary hover:bg-primary-dark active:scale-[0.99] text-white font-medium rounded-xl shadow-button hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Update Password</span>
                      <FiArrowRight size={16} />
                    </>
                  )}
                </button>

                {/* Back to Login link */}
                <p className="text-center text-xs sm:text-sm text-warm mt-4">
                  Remembered your password?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-primary hover:underline hover:text-primary-dark transition"
                  >
                    Back to Sign In
                  </Link>
                </p>
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
