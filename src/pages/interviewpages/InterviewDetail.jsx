import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Trophy,
  CheckCircle2,
  XCircle,
  Sparkles,
  Brain,
  Target,
  MessageSquare,
} from "lucide-react";

const fadeUp = {
  initial: {
    opacity: 0,
    y: 40,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.6,
    ease: "easeOut",
  },
  viewport: {
    once: true,
    amount: 0.15,
  },
};

const InterviewDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const interview = location.state?.interview;

  // NO DATA
  if (!interview) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl sm:text-5xl font-black mb-6">
          No Interview Data Found
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-black hover:bg-gray-200 transition px-6 py-3 rounded-2xl font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const answered = interview.answers?.length || 0;

  const total = interview.questions?.length || 0;

  const progress =
    total > 0
      ? Math.min((answered / total) * 100, 100)
      : 0;

  let status = "start";

  if (answered === 0) {
    status = "start";
  } else if (answered > 0 && answered < total) {
    status = "quit";
  } else if (answered === total && total > 0) {
    status = "completed";
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-500/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/20 blur-[120px]" />
      </div>

      {/* HEADER */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* LEFT */}
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(-1)}
              className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
            >
              <ArrowLeft size={20} />
            </motion.button>

            <div className="min-w-0">
              <p className="text-indigo-400 uppercase tracking-[4px] text-[10px] sm:text-xs">
                AI Interview Report
              </p>

              <h1 className="text-2xl sm:text-4xl font-black mt-1 break-words">
                {interview.role}
              </h1>
            </div>
          </div>

          {/* STATUS */}
          <div className="w-full lg:w-auto">
            {status === "completed" && (
              <div className="flex items-center justify-center gap-3 bg-green-500/10 border border-green-500/20 px-5 py-3 rounded-2xl">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

                <span className="text-green-400 font-bold uppercase text-xs sm:text-sm tracking-wide">
                  Completed
                </span>
              </div>
            )}

            {status === "quit" && (
              <div className="flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/20 px-5 py-3 rounded-2xl">
                <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />

                <span className="text-red-400 font-bold uppercase text-xs sm:text-sm tracking-wide">
                  Quit Midway
                </span>
              </div>
            )}

            {status === "start" && (
              <div className="flex items-center justify-center gap-3 bg-yellow-500/10 border border-yellow-500/20 px-5 py-3 rounded-2xl">
                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />

                <span className="text-yellow-400 font-bold uppercase text-xs sm:text-sm tracking-wide">
                  Not Started
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* HERO */}
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-5 sm:p-10 mb-8 sm:mb-10"
        >
          {/* GLOW */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/20 blur-[120px]" />

          <div className="relative">
            {/* TOP */}
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
              {/* LEFT */}
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-indigo-500/20 p-3 rounded-2xl">
                    <Brain className="text-indigo-400" />
                  </div>

                  <p className="uppercase tracking-[4px] text-indigo-400 text-xs sm:text-sm">
                    Interview Analytics
                  </p>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black leading-tight break-words">
                  {interview.role}
                  <br />
                  Interview
                </h1>

                <p className="text-gray-400 text-base sm:text-lg mt-5 break-words">
                  {interview.interviewType} • {interview.level}
                </p>
              </div>

              {/* SCORE */}
              <div className="flex justify-center">
                <motion.div
                  initial={{
                    scale: 0.8,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full border-[10px] sm:border-[14px] border-indigo-500/20 flex items-center justify-center bg-black/20 backdrop-blur-xl"
                >
                  <div className="text-center">
                    <p className="text-gray-400 uppercase tracking-[4px] text-[10px] sm:text-xs">
                      Final Score
                    </p>

                    <h1 className="text-5xl sm:text-7xl font-black mt-3">
                      {interview.totalScore || 0}
                    </h1>

                    <p className="text-indigo-400 mt-2 font-semibold">
                      Points
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
              {/* QUESTIONS */}
              <motion.div
                {...fadeUp}
                className="bg-black/20 border border-white/10 rounded-[28px] p-5 sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-500/20 p-4 rounded-2xl shrink-0">
                    <MessageSquare className="text-cyan-400" />
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      Questions
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-black mt-2">
                      {answered}/{total}
                    </h2>
                  </div>
                </div>
              </motion.div>

              {/* PROGRESS */}
              <motion.div
                {...fadeUp}
                className="bg-black/20 border border-white/10 rounded-[28px] p-5 sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-500/20 p-4 rounded-2xl shrink-0">
                    <Target className="text-yellow-400" />
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      Progress
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-black mt-2">
                      {progress.toFixed(0)}%
                    </h2>
                  </div>
                </div>
              </motion.div>

              {/* STATUS */}
              <motion.div
                {...fadeUp}
                className="bg-black/20 border border-white/10 rounded-[28px] p-5 sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-500/20 p-4 rounded-2xl shrink-0">
                    <Trophy className="text-green-400" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-gray-500 text-sm">
                      Status
                    </p>

                    <h2 className="text-2xl sm:text-3xl font-black mt-2 capitalize break-words">
                      {status}
                    </h2>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* PROGRESS BAR */}
            <div className="mt-10">
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>Interview Completion</span>

                <span>{progress.toFixed(0)}%</span>
              </div>

              <div className="w-full h-4 sm:h-5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className={`h-full rounded-full ${
                    status === "completed"
                      ? "bg-gradient-to-r from-green-400 to-emerald-600"
                      : status === "quit"
                      ? "bg-gradient-to-r from-red-400 to-rose-600"
                      : "bg-gradient-to-r from-yellow-400 to-orange-500"
                  }`}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* QUESTIONS */}
        <div className="space-y-6 sm:space-y-8">
          {interview.questions?.map((q, index) => {
            const answer =
              interview.answers?.find(
                (a) =>
                  a.question === q.question
              );

            return (
              <motion.div
                key={q._id}
                {...fadeUp}
                className="relative overflow-hidden rounded-[28px] sm:rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl"
              >
                {/* GLOW */}
                <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-indigo-500/10 blur-[100px]" />

                <div className="relative p-4 sm:p-8">
                  {/* TOP */}
                  <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <div className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-[3px] font-bold">
                          {q.type}
                        </div>

                        <div className="text-gray-500 text-sm">
                          Question {index + 1}
                        </div>
                      </div>

                      <h2 className="text-xl sm:text-3xl font-black leading-relaxed break-words">
                        {q.question}
                      </h2>
                    </div>

                    {/* ANSWER STATUS */}
                    <div className="w-full xl:w-auto">
                      {answer ? (
                        <div className="flex items-center justify-center gap-3 bg-green-500/10 border border-green-500/20 px-5 py-3 rounded-2xl">
                          <CheckCircle2 className="text-green-400 shrink-0" />

                          <span className="text-green-400 font-bold text-sm">
                            Answered
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/20 px-5 py-3 rounded-2xl">
                          <XCircle className="text-red-400 shrink-0" />

                          <span className="text-red-400 font-bold text-sm">
                            Not Answered
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ANSWER SECTION */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-8">
                    {/* USER ANSWER */}
                    <div className="bg-black/20 border border-white/10 rounded-[24px] sm:rounded-[30px] p-5 sm:p-6 overflow-hidden">
                      <div className="flex items-center gap-3 mb-5">
                        <Sparkles className="text-cyan-400 shrink-0" />

                        <h3 className="text-lg sm:text-xl font-bold text-cyan-400">
                          Your Answer
                        </h3>
                      </div>

                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words text-sm sm:text-base">
                        {answer?.userAnswer ||
                          "User did not answer this question."}
                      </p>
                    </div>

                    {/* AI FEEDBACK */}
                    <div className="bg-black/20 border border-white/10 rounded-[24px] sm:rounded-[30px] p-5 sm:p-6 overflow-hidden">
                      <div className="flex items-center gap-3 mb-5">
                        <Brain className="text-green-400 shrink-0" />

                        <h3 className="text-lg sm:text-xl font-bold text-green-400">
                          AI Feedback
                        </h3>
                      </div>

                      <p className="text-gray-300 leading-relaxed break-words text-sm sm:text-base">
                        {answer?.aiFeedback ||
                          "No feedback available."}
                      </p>
                    </div>
                  </div>

                  {/* IMPROVEMENTS + SCORE */}
                  <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-5 mt-5">
                    {/* IMPROVEMENTS */}
                    <div className="bg-black/20 border border-white/10 rounded-[24px] sm:rounded-[30px] p-5 sm:p-6 overflow-hidden">
                      <div className="flex items-center gap-3 mb-5">
                        <Target className="text-yellow-400 shrink-0" />

                        <h3 className="text-lg sm:text-xl font-bold text-yellow-400">
                          Improvements
                        </h3>
                      </div>

                      <p className="text-gray-300 leading-relaxed break-words text-sm sm:text-base">
                        {answer?.improvement ||
                          "No suggestions available."}
                      </p>
                    </div>

                    {/* SCORE */}
                    <div className="bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 border border-indigo-500/20 rounded-[24px] sm:rounded-[30px] p-5 sm:p-6 flex flex-col justify-center items-center text-center min-h-[180px]">
                      <p className="text-xs uppercase tracking-[4px] text-indigo-300">
                        Score
                      </p>

                      <h1 className="text-5xl sm:text-6xl font-black mt-4">
                        {answer?.score ?? 0}
                      </h1>

                      <p className="text-gray-400 mt-2">
                        /10
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InterviewDetail;