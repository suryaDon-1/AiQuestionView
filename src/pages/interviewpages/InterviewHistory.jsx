import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowRight,
  Trash2,
  Trophy,
  Sparkles,
  Play,
  PauseCircle,
  CheckCircle2,
  LogOut,
  Plus,
} from "lucide-react";

import {
  getHistory,
  deleteInterview,
} from "../../features/interview/interviewSlice.js";

import { logout } from "../../features/auth/authSlice.js";

import CreateInterview from "./CreateInterview.jsx";

const InterviewHistory = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { history, loading } = useSelector(
    (state) => state.interview,
  );

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedInterviewId, setSelectedInterviewId] =
    useState(null);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);

  const handleDelete = (id) => {
    setSelectedInterviewId(id);

    setShowDeleteModal(true);
  };

  const confirmDeleteInterview = async () => {
    try {
      await dispatch(
        deleteInterview({
          interviewId: selectedInterviewId,
        }),
      );

      dispatch(getHistory());

      setShowDeleteModal(false);

      setSelectedInterviewId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white px-4">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="flex flex-col items-center gap-5"
        >
          <div className="w-16 h-16 border-[5px] border-indigo-500 border-t-transparent rounded-full animate-spin" />

          <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-center">
            Loading Interviews...
          </h2>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* FLOATING CREATE BUTTON */}
      <motion.button
        initial={{
          opacity: 0,
          scale: 0.7,
          y: 50,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 group"
      >
        <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-40 group-hover:opacity-70 transition duration-300 rounded-full" />

        <div className="relative flex items-center gap-3 bg-white text-black hover:scale-105 transition-all duration-300 px-4 sm:px-7 py-4 rounded-full shadow-2xl font-black text-sm sm:text-lg">
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
            <Plus size={22} />
          </div>

          <span className="hidden sm:block">
            Create Interview
          </span>
        </div>
      </motion.button>

      {/* MAIN */}
      <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">
        {/* BACKGROUND */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-500/20 blur-[120px]" />

          <div className="absolute bottom-0 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-cyan-500/20 blur-[120px]" />
        </div>

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: -40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-10"
        >
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
            {/* LEFT */}
            <div>
              <p className="text-indigo-400 uppercase tracking-[4px] sm:tracking-[6px] text-[11px] sm:text-sm">
                AI INTERVIEW DASHBOARD
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-3 leading-tight">
                Your Interview
                <br />
                Journey
              </h1>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto">
              {/* TOTAL CARD */}
              <motion.div
                whileHover={{
                  y: -4,
                }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] px-6 py-5 min-w-full sm:min-w-[240px]"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-500/20 p-3 rounded-2xl">
                    <Trophy className="text-yellow-400" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-400">
                      Total Interviews
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-black">
                      {history?.length || 0}
                    </h2>
                  </div>
                </div>
              </motion.div>

              {/* LOGOUT */}
              <motion.button
                whileTap={{
                  scale: 0.96,
                }}
                whileHover={{
                  y: -3,
                }}
                onClick={handleLogout}
                className="group relative overflow-hidden rounded-[24px] border border-red-500/20 bg-red-500/10 hover:bg-red-500 px-6 sm:px-7 py-5 transition-all duration-300 flex items-center justify-center gap-3 font-bold shadow-lg hover:shadow-red-500/30"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition duration-300" />

                <div className="relative z-10 bg-white/10 p-2 rounded-xl">
                  <LogOut size={20} />
                </div>

                <span className="relative z-10">
                  Logout
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* TIMELINE */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <div className="relative">
            {/* CENTER LINE */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-cyan-500 to-transparent hidden md:block" />

            <div className="space-y-10 sm:space-y-16">
              {history?.map((item, index) => {
                const answered =
                  item.answers?.length || 0;

                const total =
                  item.questions?.length || 0;

                const progress =
                  total > 0
                    ? Math.min(
                        (answered / total) * 100,
                        100,
                      )
                    : 0;

                let status = "start";

                if (answered === 0) {
                  status = "start";
                } else if (
                  answered > 0 &&
                  answered < total
                ) {
                  status = "quit";
                } else if (
                  answered === total &&
                  total > 0
                ) {
                  status = "completed";
                }

                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={item._id}
                    initial={{
                      opacity: 0,
                      x: isLeft ? -100 : 100,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    className={`relative flex ${
                      isLeft
                        ? "md:justify-start"
                        : "md:justify-end"
                    } justify-center`}
                  >
                    {/* CENTER DOT */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-10 z-20">
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                        }}
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 shadow-[0_0_30px_rgba(99,102,241,0.8)]"
                      />
                    </div>

                    {/* CARD */}
                    <div className="w-full md:w-[46%] relative">
                      <motion.div
                        whileHover={{
                          y: -6,
                        }}
                        className="group relative overflow-hidden rounded-[28px] sm:rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-indigo-500/40 transition-all duration-500"
                      >
                        {/* GLOW */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent" />

                        {/* CONTENT */}
                        <div className="relative p-5 sm:p-7">
                          {/* TOP */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 text-indigo-400 mb-3">
                                <Sparkles size={15} />

                                <span className="text-[10px] sm:text-xs tracking-[3px] sm:tracking-[4px] uppercase">
                                  AI Session
                                </span>
                              </div>

                              <h2 className="text-2xl sm:text-3xl font-black leading-tight break-words">
                                {item.role}
                              </h2>

                              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                                {item.interviewType} •{" "}
                                {item.level}
                              </p>
                            </div>

                            {/* STATUS ICON */}
                            <div className="shrink-0">
                              {status ===
                                "completed" && (
                                <div className="bg-green-500/20 text-green-400 p-3 rounded-2xl">
                                  <CheckCircle2
                                    size={24}
                                  />
                                </div>
                              )}

                              {status === "quit" && (
                                <div className="bg-red-500/20 text-red-400 p-3 rounded-2xl">
                                  <PauseCircle
                                    size={24}
                                  />
                                </div>
                              )}

                              {status === "start" && (
                                <div className="bg-yellow-500/20 text-yellow-400 p-3 rounded-2xl">
                                  <Play size={24} />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* SCORE */}
                          <div className="mt-8 sm:mt-10 flex items-end gap-3">
                            <h1 className="text-5xl sm:text-7xl font-black bg-gradient-to-r from-white to-gray-500 text-transparent bg-clip-text">
                              {item.totalScore || 0}
                            </h1>

                            <span className="text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base">
                              points
                            </span>
                          </div>

                          {/* STATUS BADGE */}
                          <div className="mt-6">
                            {status ===
                              "completed" && (
                              <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 px-4 sm:px-5 py-3 rounded-2xl backdrop-blur-xl">
                                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

                                <span className="font-bold tracking-wide uppercase text-[11px] sm:text-sm">
                                  Completed
                                </span>
                              </div>
                            )}

                            {status === "quit" && (
                              <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 sm:px-5 py-3 rounded-2xl backdrop-blur-xl">
                                <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />

                                <span className="font-bold tracking-wide uppercase text-[11px] sm:text-sm">
                                  Quit Midway
                                </span>
                              </div>
                            )}

                            {status === "start" && (
                              <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-4 sm:px-5 py-3 rounded-2xl backdrop-blur-xl">
                                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />

                                <span className="font-bold tracking-wide uppercase text-[11px] sm:text-sm">
                                  Not Started
                                </span>
                              </div>
                            )}
                          </div>

                          {/* PROGRESS */}
                          <div className="mt-8">
                            <div className="flex items-center justify-between text-xs sm:text-sm mb-3 gap-4">
                              <span className="text-gray-400">
                                Progress
                              </span>

                              <span className="font-semibold text-right">
                                {answered}/{total}{" "}
                                Questions
                              </span>
                            </div>

                            <div className="h-4 rounded-full bg-white/5 overflow-hidden border border-white/10">
                              <motion.div
                                initial={{
                                  width: 0,
                                }}
                                whileInView={{
                                  width: `${progress}%`,
                                }}
                                transition={{
                                  duration: 1,
                                }}
                                viewport={{
                                  once: true,
                                }}
                                className={`h-full rounded-full ${
                                  status ===
                                  "completed"
                                    ? "bg-gradient-to-r from-green-400 to-emerald-600"
                                    : status === "quit"
                                      ? "bg-gradient-to-r from-red-400 to-rose-600"
                                      : "bg-gradient-to-r from-yellow-400 to-orange-500"
                                }`}
                              />
                            </div>
                          </div>

                          {/* ACTIONS */}
                          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                            {status === "start" ? (
                              <motion.button
                                whileTap={{
                                  scale: 0.97,
                                }}
                                whileHover={{
                                  scale: 1.02,
                                }}
                                onClick={() =>
                                  navigate(
                                    `/interviewSession/${item._id}`,
                                  )
                                }
                                className="flex-1 group/button bg-white text-black hover:bg-indigo-500 hover:text-white transition-all duration-300 rounded-2xl px-6 py-4 font-bold flex items-center justify-center gap-3"
                              >
                                Start Session

                                <ArrowRight
                                  size={18}
                                  className="group-hover/button:translate-x-1 transition"
                                />
                              </motion.button>
                            ) : (
                              <motion.button
                                whileTap={{
                                  scale: 0.97,
                                }}
                                whileHover={{
                                  scale: 1.02,
                                }}
                                onClick={() =>
                                  navigate(
                                    `/interviewDetails/${item._id}`,
                                    {
                                      state: {
                                        interview:
                                          item,
                                      },
                                    },
                                  )
                                }
                                className="flex-1 group/button bg-white text-black hover:bg-indigo-500 hover:text-white transition-all duration-300 rounded-2xl px-6 py-4 font-bold flex items-center justify-center gap-3"
                              >
                                Open Report

                                <ArrowRight
                                  size={18}
                                  className="group-hover/button:translate-x-1 transition"
                                />
                              </motion.button>
                            )}

                            {/* DELETE */}
                            <motion.button
                              whileTap={{
                                scale: 0.9,
                              }}
                              whileHover={{
                                scale: 1.05,
                              }}
                              onClick={() =>
                                handleDelete(
                                  item._id,
                                )
                              }
                              className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 p-4 rounded-2xl transition-all duration-300 flex items-center justify-center"
                            >
                              <Trash2
                                className="text-red-400"
                                size={22}
                              />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[120] p-4 sm:p-6">
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
              className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-[#0B1120]/95 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.65)] overflow-hidden p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-500/10 border border-red-500/20 shrink-0">
                  <LogOut
                    className="text-red-400"
                    size={26}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-red-400 uppercase tracking-[3px] text-[10px] sm:text-xs font-semibold">
                    SESSION
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 leading-tight">
                    Logout?
                  </h2>

                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed mt-3">
                    Are you sure you want to logout
                    from your interview dashboard?
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() =>
                    setShowLogoutModal(false)
                  }
                  className="flex-1 h-12 rounded-2xl bg-white text-black hover:bg-gray-200 transition-all duration-300 font-bold"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmLogout}
                  className="flex-1 h-12 rounded-2xl bg-red-600 hover:bg-red-700 transition-all duration-300 font-bold text-white shadow-lg shadow-red-500/20"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[120] p-4 sm:p-6">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              className="bg-slate-900 border border-red-500/20 rounded-[28px] p-6 sm:p-8 max-w-md w-full"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-red-400 mb-4">
                Delete Interview?
              </h2>

              <p className="text-gray-400 leading-relaxed mb-8 text-sm sm:text-base">
                This interview session and report
                will be permanently deleted.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);

                    setSelectedInterviewId(null);
                  }}
                  className="flex-1 bg-white text-black hover:bg-gray-200 transition py-4 rounded-2xl font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDeleteInterview}
                  className="flex-1 bg-red-600 text-white
                   hover:bg-red-700 transition py-4 rounded-2xl font-semibold"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE INTERVIEW MODAL */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
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
              className="relative w-full max-w-2xl rounded-[30px] border border-white/10 bg-[#0B1120]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-white/10">
                <div>
                  <p className="text-indigo-400 uppercase tracking-[4px] text-[10px] sm:text-[11px]">
                    AI INTERVIEW
                  </p>

                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Create New Interview
                  </h2>
                </div>

                {/* CLOSE */}
                <button
                  onClick={() =>
                    setShowCreateModal(false)
                  }
                  className="group w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white transition-all duration-300 flex items-center justify-center"
                >
                  <span className="text-white group-hover:text-black text-xl sm:text-2xl transition duration-300">
                    ✕
                  </span>
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
                <CreateInterview
                  closeModal={() =>
                    setShowCreateModal(false)
                  }
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InterviewHistory;