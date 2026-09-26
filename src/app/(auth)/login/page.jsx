"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession, getSession } from "next-auth/react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import GoogleOneTap from "@/components/auth/GoogleOneTap";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (session.user.role === "admin") {
        router.push("/admin");
      } else if (callbackUrl && !callbackUrl.includes("/dashboard") && !callbackUrl.includes("/admin")) {
        router.push(callbackUrl);
      } else {
        router.push("/");
      }
    }
  }, [status, session, router, callbackUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setErrorMessage(res.error);
        setLoading(false);
        return;
      }

      setSuccess(true);
      const freshSession = await getSession();
      setLoading(false);

      setTimeout(() => {
        if (freshSession?.user?.role === "admin") {
          router.push("/admin");
        } else if (callbackUrl && !callbackUrl.includes("/dashboard") && !callbackUrl.includes("/admin")) {
          router.push(callbackUrl);
        } else {
          router.push("/");
        }
        router.refresh();
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setGoogleLoading(true);
    try {
      await signIn("google", {
        callbackUrl: callbackUrl || "/",
      });
    } catch (err) {
      setErrorMessage("Google Sign In failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sage-light/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#3D5938]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Google One-Tap component */}
      <GoogleOneTap
        callbackUrl={callbackUrl}
        onStart={() => setLoading(true)}
        onError={(err) => {
          setLoading(false);
          setErrorMessage(err);
        }}
      />

      {/* Main Container / Modal Card */}
      <div className="relative w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl shadow-soft border border-sage-light/60 overflow-hidden grid grid-cols-1 md:grid-cols-12 z-10 transition-all duration-300">
        
        {/* Left Side: Brand & Visual Info */}
        <div className="md:col-span-5 bg-gradient-to-br from-cream-light via-cream to-sage-light/40 p-8 sm:p-10 flex flex-col justify-between items-center text-center border-b md:border-b-0 md:border-r border-sage-light/60 relative overflow-hidden">
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
                "Every stitch tells a story of care, warmth & patience."
              </p>
              <p className="text-xs text-warm">
                Join our community of handcrafted warmth.
              </p>
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="flex items-center gap-2 text-xs text-warm z-10">
            <FaHeart className="text-rose-400 animate-pulse" />
            <span>100% Handcrafted & Made with Care</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            
            {/* Form Header */}
            <div className="text-center md:text-left mb-6">
              <h2 className="font-heading text-2xl sm:text-3xl text-primary font-bold tracking-tight">
                Welcome Back
              </h2>
              <p className="text-sm text-warm mt-1">
                Sign in to your account, manage orders, and explore our collection.
              </p>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in">
                <FiAlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {success ? (
              <div className="bg-cream-light border border-sage p-6 rounded-2xl text-center animate-fade-in">
                <FiCheckCircle className="w-12 h-12 text-primary mx-auto mb-3 animate-bounce" />
                <h3 className="font-heading text-xl text-primary font-bold mb-1">Welcome back!</h3>
                <p className="text-sm text-warm mb-4">You have successfully signed in. Redirecting...</p>
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative rounded-xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                      <FiMail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-cream-light/40 border border-sage/60 rounded-xl text-sm text-primary placeholder-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-primary uppercase tracking-wider">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary/80 hover:text-primary hover:underline transition"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative rounded-xl shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                      <FiLock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter your password"
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

                {/* Remember Me Checkbox */}
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-sage/80 text-primary focus:ring-primary/30 accent-[#3D5938] cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2.5 block text-xs sm:text-sm text-warm cursor-pointer select-none">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="w-full py-3.5 px-4 bg-primary hover:bg-primary-dark active:scale-[0.99] text-white font-medium rounded-xl shadow-button hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <FiArrowRight size={16} />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-sage-light"></div>
                  <span className="flex-shrink mx-4 text-xs uppercase tracking-wider text-muted font-medium">
                    OR
                  </span>
                  <div className="flex-grow border-t border-sage-light"></div>
                </div>

                {/* Social Login Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading || googleLoading}
                  className="w-full py-3 px-4 border border-sage/60 hover:bg-cream-light/50 bg-white rounded-xl text-sm font-medium text-primary flex items-center justify-center gap-3 transition cursor-pointer shadow-xs hover:border-sage disabled:opacity-70"
                >
                  {googleLoading ? (
                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  ) : (
                    <>
                      <FcGoogle size={20} />
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                {/* Sign up prompt */}
                <p className="text-center text-xs sm:text-sm text-warm mt-6">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-primary hover:underline hover:text-primary-dark transition"
                  >
                    Create an account
                  </Link>
                </p>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* Footer copyright */}
      <div className="absolute bottom-3 text-center w-full text-[11px] text-warm/70">
        © {new Date().getFullYear()} Crochet Alif. Handcrafted with love.
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center"><div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
