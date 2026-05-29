import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers3,
  Target,
} from "lucide-react";

import {
  getSingleInterview,
  submitAnswer,
} from "../../features/interview/interviewSlice";

const InterviewSession = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentInterview, loading } = useSelector((state) => state.interview);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getSingleInterview(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (
      currentInterview?.status === "quit" ||
      currentInterview?.status === "completed"
    ) {
      navigate("/dashboard");
    }
  }, [currentInterview, navigate]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if ((currentInterview?.answers?.length || 0) > 0) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentInterview]);

  useEffect(() => {
    const hasAnswers = (currentInterview?.answers?.length || 0) > 0;

    const handlePopState = () => {
      if (!hasAnswers) {
        navigate(-1);
        return;
      }

      const confirmLeave = window.confirm(
        "This interview session will end and cannot be resumed.",
      );

      if (confirmLeave) {
        navigate("/dashboard");
      } else {
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.history.pushState(null, "", window.location.pathname);

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentInterview, navigate]);

  const questions = currentInterview?.questions || [];

  const currentQuestion = questions[currentIndex];

  const answeredQuestions = currentInterview?.answers?.length || 0;

  const progress =
    questions.length > 0 ? (answeredQuestions / questions.length) * 100 : 0;

  const handleSubmitAnswer = async () => {
    if (!answer.trim() || submitting) return;

    setSubmitting(true);

    const toastId = toast.loading("Evaluating Answer...");

    try {
      const res = await dispatch(
        submitAnswer({
          interviewId: id,
          data: {
            questionIndex: currentIndex,
            userAnswer: answer,
          },
        }),
      );

      const payload = res?.payload;

      if (!payload?.evaluation) {
        toast.error("Evaluation Failed", {
          id: toastId,
        });

        return;
      }

      setEvaluation(payload.evaluation);

      setShowEvaluation(true);

      setAnswer("");

      toast.success("Answer Evaluated", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong", {
        id: toastId,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    setShowEvaluation(false);

    setEvaluation(null);

    if (currentIndex + 1 >= questions.length) {
      navigate(`/interviewDetails/${id}`, {
        state: {
          interview: {
            ...currentInterview,
            status: "completed",
          },
        },
      });

      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleExitInterview = () => {
    navigate("/dashboard");
  };

  if (loading || !currentInterview) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-[6px] border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-6 text-xl sm:text-2xl font-bold">
            Initializing AI Interview...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-500/20 blur-[120px]" />

          <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/20 blur-[120px]" />
        </div>

        {/* HEADER */}
        <div className="border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 bg-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500/20 p-3 rounded-2xl">
                <Brain className="text-indigo-400" />
              </div>

              <div>
                <p className="text-[10px] sm:text-xs uppercase tracking-[4px] text-indigo-400">
                  AI Interview
                </p>

                <h1 className="text-xl sm:text-2xl font-black">Live Session</h1>
              </div>
            </div>

            <button
              onClick={() => {
                if (answeredQuestions === 0) {
                  navigate(-1);
                } else {
                  setShowExitModal(true);
                }
              }}
              className={`w-full sm:w-auto px-5 py-3 rounded-2xl transition border text-sm sm:text-base ${
                answeredQuestions === 0
                  ? "bg-white/5 hover:bg-white/10 border-white/10"
                  : "bg-red-500/10 hover:bg-red-500/20 border-red-500/20 text-red-400"
              }`}
            >
              {answeredQuestions === 0 ? "Go Back" : "Exit Interview"}
            </button>
          </div>
        </div>

        {/* MAIN */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 lg:gap-8">
            {/* LEFT PANEL */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* ROLE */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[28px] sm:rounded-[32px] p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="text-indigo-400" />

                  <p className="uppercase text-xs sm:text-sm tracking-[4px] text-indigo-400">
                    Session Info
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-gray-500 text-sm">Role</p>

                    <h2 className="text-xl sm:text-2xl font-black mt-2 break-words">
                      {currentInterview.role}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                      <p className="text-xs text-gray-500">Level</p>

                      <h3 className="font-bold mt-2 capitalize text-sm sm:text-base">
                        {currentInterview.level}
                      </h3>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                      <p className="text-xs text-gray-500">Questions</p>

                      <h3 className="font-bold mt-2 text-sm sm:text-base">
                        {questions.length}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* PROGRESS */}
              <div className="bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 border border-indigo-500/20 rounded-[28px] sm:rounded-[32px] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-indigo-300">Progress</p>

                    <h2 className="text-4xl sm:text-5xl font-black mt-3">
                      {progress.toFixed(0)}%
                    </h2>
                  </div>

                  <div className="bg-white/10 p-4 sm:p-5 rounded-3xl">
                    <Target size={32} />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="w-full h-4 bg-black/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${progress}%`,
                      }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full"
                    />
                  </div>

                  <p className="mt-4 text-sm text-gray-300">
                    {answeredQuestions} of {questions.length} answered
                  </p>
                </div>
              </div>

              {/* QUESTION NAV */}
              <div className="bg-white/5 border border-white/10 rounded-[28px] sm:rounded-[32px] p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Layers3 className="text-cyan-400" />

                  <p className="uppercase text-xs sm:text-sm tracking-[4px] text-cyan-400">
                    Question
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold border text-sm ${
                        currentIndex === index
                          ? "bg-indigo-500 border-indigo-400"
                          : index < answeredQuestions
                            ? "bg-green-500/20 border-green-500/30 text-green-400"
                            : "bg-white/5 border-white/10"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <div className="space-y-6 sm:space-y-8">
              {/* QUESTION */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-5 sm:p-10"
              >
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px]" />

                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
                    <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-5 py-2 rounded-full uppercase text-[10px] sm:text-xs tracking-[4px] font-bold w-fit">
                      {currentQuestion?.type}
                    </div>

                    <div className="text-gray-500 font-medium text-sm sm:text-base">
                      Question {currentIndex + 1}
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.5] break-words">
                    {currentQuestion?.question}
                  </h2>
                </div>
              </motion.div>

              {/* ANSWER BOX */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[28px] sm:rounded-[40px] p-5 sm:p-8"
              >
                {!showEvaluation ? (
                  <>
                    <div className="mb-6">
                      <p className="text-xs sm:text-sm uppercase tracking-[4px] text-gray-400">
                        Your Answer
                      </p>
                    </div>

                    <textarea
                      rows={window.innerWidth < 640 ? 7 : 10}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Write your professional answer here..."
                      className="w-full bg-black/30 border border-white/10 rounded-[22px] sm:rounded-[30px] p-4 sm:p-6 text-base sm:text-lg resize-none outline-none focus:border-indigo-500 transition"
                    />

                    <button
                      onClick={handleSubmitAnswer}
                      disabled={!answer.trim() || submitting}
                      className="mt-8 w-full sm:w-auto justify-center bg-white text-black hover:bg-indigo-500 hover:text-white transition-all duration-300 px-6 sm:px-8 py-4 rounded-2xl font-bold flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Evaluating...
                        </>
                      ) : (
                        <>
                          Submit Answer
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <div className="bg-green-500/20 p-4 rounded-3xl">
                        <CheckCircle2 className="text-green-400" />
                      </div>

                      <div>
                        <p className="text-xs sm:text-sm uppercase tracking-[4px] text-green-400">
                          AI Analysis
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-black mt-2">
                          Evaluation
                        </h2>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-500/20 to-cyan-500/10 border border-indigo-500/20 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 mb-8">
                      <p className="text-xs sm:text-sm text-indigo-300 uppercase tracking-[4px]">
                        Performance Score
                      </p>

                      <div className="flex items-end gap-3 mt-5">
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black">
                          {evaluation.score}
                        </h1>

                        <span className="text-2xl sm:text-3xl text-gray-400 mb-2 sm:mb-3">
                          /10
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-black/20 border border-white/5 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-4">
                          Feedback
                        </h3>

                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                          {evaluation.feedback}
                        </p>
                      </div>

                      <div className="bg-black/20 border border-white/5 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-4">
                          Improvements
                        </h3>

                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                          {evaluation.improvement}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      className="mt-10 w-full sm:w-auto justify-center bg-white text-black hover:bg-indigo-500 hover:text-white transition-all duration-300 px-6 sm:px-8 py-4 rounded-2xl font-bold flex items-center gap-3"
                    >
                      {currentIndex + 1 === questions.length
                        ? "Finish Interview"
                        : "Next Question"}

                      <ArrowRight size={20} />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* EXIT MODAL */}
      <AnimatePresence>
        {showExitModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6">
            <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-red-500/20 blur-[120px]" />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative w-full max-w-xl overflow-hidden rounded-[28px] sm:rounded-[40px] border border-white/10 bg-[#0B1120]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute top-0 inset-x-0 h-[5px] bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

              <div className="p-5 sm:p-8 lg:p-10">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500 blur-2xl opacity-30 rounded-full" />

                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/20 border border-red-500/30 flex items-center justify-center">
                      <AlertTriangle className="text-red-400" size={36} />
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <p className="text-red-400 uppercase tracking-[5px] sm:tracking-[6px] text-xs sm:text-sm font-semibold">
                    Warning
                  </p>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 leading-tight text-white">
                    End Interview?
                  </h2>

                  <p className="text-sm sm:text-lg text-gray-400 leading-relaxed mt-6 max-w-md mx-auto">
                    Your current interview session will be permanently closed
                    and your remaining questions will not be saved.
                  </p>
                </div>

                <div className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/10 p-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-500/20 p-3 rounded-2xl shrink-0">
                      <AlertTriangle className="text-red-400" size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-red-300 text-base sm:text-lg">
                        Session Cannot Be Resumed
                      </h3>

                      <p className="text-sm sm:text-base text-gray-400 mt-2 leading-relaxed">
                        Once you exit this interview, your progress will be
                        marked as incomplete.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-10">
                  <button
                    onClick={() => setShowExitModal(false)}
                    className="rounded-2xl border border-white/20 bg-white text-black hover:bg-gray-200 py-4 font-bold transition-all duration-300"
                  >
                    Continue Interview
                  </button>

                  <button
                    onClick={handleExitInterview}
                    className="rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:scale-[1.02] py-4 font-bold transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                  >
                    End Interview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InterviewSession;
