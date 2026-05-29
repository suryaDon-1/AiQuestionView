import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";

import Login from "../pages/authpages/Login.jsx";
import Register from "../pages/authpages/Register.jsx";

export default function Home() {
  const { user } = useSelector((state) => state.auth);

  const [authModal, setAuthModal] = useState(null);

  const features = [
    {
      title: "AI Interview Questions",
      desc: "Generate smart role-based interview questions tailored to your experience level.",
      icon: "🧠",
    },
    {
      title: "Real-Time AI Evaluation",
      desc: "Receive instant AI scoring, detailed feedback, and answer analysis.",
      icon: "⚡",
    },
    {
      title: "Personalized Coaching",
      desc: "Get custom tips and improvement suggestions after every session.",
      icon: "🎯",
    },
    {
      title: "Interview History",
      desc: "Track your progress, scores, and previous interview performance.",
      icon: "📊",
    },
    {
      title: "Resume Anytime",
      desc: "Continue your interview preparation from where you stopped.",
      icon: "🔄",
    },
    {
      title: "Skill Based Levels",
      desc: "Practice interviews for junior, mid-level, and senior positions.",
      icon: "🚀",
    },
  ];

  const steps = [
    "Create Interview",
    "AI Generates Questions",
    "Answer Questions",
    "Get AI Evaluation",
    "Improve & Repeat",
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">
      {/* ================= MODAL ================= */}
      {authModal && !user && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-[430px] rounded-[24px] sm:rounded-[30px] border border-white/10 bg-[#0b1020] overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.15)]">
            {/* GLOW */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] bg-blue-500/20 blur-[100px] rounded-full" />

            {/* CLOSE */}
            <button
              onClick={() => setAuthModal(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            >
              ✕
            </button>

            <div className="relative z-10 p-5 sm:p-7">
              {/* CHOOSER */}
              {authModal === "chooser" && (
                <>
                  <div className="text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl sm:text-2xl font-black mb-5 shadow-lg shadow-blue-500/20">
                      AI
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold">
                      Welcome
                    </h2>

                    <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                      Practice AI-powered interviews and improve your
                      communication confidence.
                    </p>
                  </div>

                  <div className="mt-8 space-y-3">
                    <button
                      onClick={() => setAuthModal("register")}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] transition duration-300 font-semibold shadow-lg shadow-blue-500/20"
                    >
                      Get Started
                    </button>

                    <button
                      onClick={() => setAuthModal("login")}
                      className="w-full py-3.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition duration-300 font-semibold"
                    >
                      I Already Have an Account
                    </button>
                  </div>
                </>
              )}

              {/* LOGIN */}
              {authModal === "login" && (
                <>
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl sm:text-2xl font-black mb-5 shadow-lg shadow-blue-500/20">
                      AI
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold">
                      Welcome Back
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                      Continue your AI interview preparation.
                    </p>
                  </div>

                  <Login setAuthModal={setAuthModal} />

                  <div className="mt-5 text-center text-sm text-gray-400">
                    Don’t have an account?{" "}
                    <button
                      onClick={() => setAuthModal("register")}
                      className="text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      Create Account
                    </button>
                  </div>
                </>
              )}

              {/* REGISTER */}
              {authModal === "register" && (
                <>
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl sm:text-2xl font-black mb-5 shadow-lg shadow-blue-500/20">
                      AI
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold">
                      Create Account
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                      Start your AI interview journey today.
                    </p>
                  </div>

                  <Register setAuthModal={setAuthModal} />

                  <div className="mt-5 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <button
                      onClick={() => setAuthModal("login")}
                      className="text-blue-400 hover:text-blue-300 font-semibold"
                    >
                      Sign In
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[250px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[400px] lg:h-[500px] bg-blue-500/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[400px] lg:h-[500px] bg-purple-500/20 blur-[120px] rounded-full" />
      </div>

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-[#050816]/70">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm sm:text-base">
              AI
            </div>

            <h1 className="text-base sm:text-xl font-bold">
              AI Interview Coach
            </h1>
          </div>

          {/* NAV */}
          <div className="hidden md:flex items-center gap-10 text-sm text-gray-300">
            <a href="#home" className="hover:text-white transition">
              Home
            </a>

            <a href="#features" className="hover:text-white transition">
              Features
            </a>

            <a href="#how" className="hover:text-white transition">
              How It Works
            </a>
          </div>

          {/* RIGHT */}
          <div>
            {user ? (
              <Link
                to="/dashboard"
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition duration-300 font-medium shadow-lg shadow-blue-500/20 text-sm sm:text-base"
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={() => setAuthModal("chooser")}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition duration-300 font-medium shadow-lg shadow-blue-500/20 text-sm sm:text-base"
              >
                Get Started
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* LEFT */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm text-gray-300 mb-6 sm:mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            AI-Powered Mock Interview Platform
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-tight">
            Crack Your Next
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Interview
            </span>
            <br />
            With AI
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed mx-auto lg:mx-0">
            Practice real technical interviews, receive AI feedback, improve
            communication skills, and boost confidence before your dream job
            interview.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            {user ? (
              <Link
                to="/dashboard"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold text-center hover:scale-105 transition duration-300 shadow-2xl shadow-blue-500/20"
              >
                Go To Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={() => setAuthModal("chooser")}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold hover:scale-105 transition duration-300 shadow-2xl shadow-blue-500/20"
                >
                  Start Free Interview
                </button>

                <button
                  onClick={() => setAuthModal("login")}
                  className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition duration-300 font-semibold"
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* STATS */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm text-gray-400 justify-center lg:justify-start">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                10K+
              </h3>

              Interviews Completed
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                95%
              </h3>

              User Satisfaction
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative w-full">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-[40px]" />

          <div className="relative bg-white/5 border border-white/10 rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 backdrop-blur-2xl shadow-2xl">
            {/* TOP */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <h3 className="font-semibold text-base sm:text-lg">
                  Frontend Developer Interview
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Senior Level • AI Session
                </p>
              </div>

              <div className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20 w-fit">
                Live AI
              </div>
            </div>

            {/* CHAT */}
            <div className="space-y-5 sm:space-y-6 mt-6">
              <div className="bg-[#111827] border border-white/10 rounded-2xl p-4 sm:p-5 w-full max-w-full sm:max-w-md">
                <p className="text-sm text-blue-400 mb-2">
                  AI Interviewer
                </p>

                <p className="text-gray-200 text-sm sm:text-base">
                  Explain the difference between useMemo and useCallback in
                  React.
                </p>
              </div>

              <div className="ml-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 sm:p-5 w-full max-w-full sm:max-w-md">
                <p className="text-sm text-white/80 mb-2">
                  Your Answer
                </p>

                <p className="text-white text-sm">
                  useMemo memoizes values while useCallback memoizes functions
                  to optimize rendering performance.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4 gap-4">
                  <h4 className="font-semibold">
                    AI Feedback
                  </h4>

                  <div className="text-green-400 font-bold text-sm sm:text-base">
                    8.7 / 10
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex gap-3">
                    <span className="text-green-400">✔</span>
                    Good explanation of memoization concepts.
                  </div>

                  <div className="flex gap-3">
                    <span className="text-yellow-400">➜</span>
                    Add practical examples for stronger answers.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-flex px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 mb-6">
            Features
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Everything You Need To Ace Interviews
          </h2>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Powerful AI tools designed to help developers improve interview
            performance and confidence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl hover:-translate-y-2 hover:border-blue-500/30 transition duration-500"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center text-2xl sm:text-3xl mb-6 border border-white/10 group-hover:scale-110 transition duration-300">
                {feature.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 sm:mb-20">
            <div className="inline-flex px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 mb-6">
              How It Works
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Simple Process
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-xl"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl sm:text-2xl font-bold mb-6">
                  {index + 1}
                </div>

                <h3 className="font-semibold text-base sm:text-lg">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      {!user && (
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto rounded-[28px] sm:rounded-[40px] border border-white/10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 sm:p-12 md:p-16 backdrop-blur-2xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Ready To Improve Your Interview Skills?
            </h2>

            <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              Start practicing with AI today and prepare yourself for your dream
              company interviews.
            </p>

            <button
              onClick={() => setAuthModal("chooser")}
              className="mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition duration-300 font-semibold shadow-xl shadow-blue-500/20"
            >
              Get Started Free
            </button>
          </div>
        </section>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold">
              AI
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                AI Interview Coach
              </h2>

              <p className="text-sm text-gray-400">
                Practice smarter with AI
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 AI Interview Coach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}