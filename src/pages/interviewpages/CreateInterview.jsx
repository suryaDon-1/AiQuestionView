import { useState } from "react";
import {
  Briefcase,
  Layers,
  ClipboardList,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { useDispatch } from "react-redux";

import {
  createInterview,
  getHistory,
} from "../../features/interview/interviewSlice.js";

import toast from "react-hot-toast";

const CreateInterview = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    role: "",
    level: "junior",
    interviewType: "quick",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PREVENT MULTIPLE CLICKS
    if (loading) return;

    setLoading(true);

    const toastId = toast.loading("Creating Interview...");

    try {
      const res = await dispatch(createInterview(formData));

      if (res?.meta?.requestStatus === "fulfilled") {
        await dispatch(getHistory());

        toast.success("Interview Created Successfully", {
          id: toastId,
        });

        closeModal();
      } else {
        toast.error("Failed To Create Interview", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* SMALL GLOW */}
      <div className="absolute -top-10 -left-10 w-[180px] h-[180px] bg-indigo-500/10 blur-[80px]" />

      <div className="absolute -bottom-10 -right-10 w-[180px] h-[180px] bg-cyan-500/10 blur-[80px]" />

      {/* CARD */}
      <div className="relative rounded-[28px] border border-white/10 bg-[#0B1120]/90 backdrop-blur-2xl overflow-hidden">
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shrink-0">
              <Sparkles className="text-white" size={22} />
            </div>

            <div>
              <p className="text-indigo-400 uppercase tracking-[4px] text-[10px]">
                AI INTERVIEW
              </p>

              <h1 className="text-2xl font-black text-white mt-1">
                Create Session
              </h1>

              <p className="text-gray-400 text-sm mt-1">
                Generate personalized interview questions.
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* ROLE */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">
              Target Role
            </label>

            <div className="relative">
              <Briefcase
                className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
                size={18}
              />

              <input
                type="text"
                name="role"
                placeholder="Frontend Developer"
                value={formData.role}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full h-14 rounded-xl bg-black/40 border border-white/10 focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all duration-300 pl-12 pr-4 text-white placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* LEVEL */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">
              Experience Level
            </label>

            <div className="relative">
              <Layers
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                size={18}
              />

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                disabled={loading}
                className="w-full appearance-none h-14 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/10 outline-none transition-all duration-300 pl-12 pr-4 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="junior" className="bg-slate-900">
                  Junior
                </option>

                <option value="mid" className="bg-slate-900">
                  Mid
                </option>

                <option value="senior" className="bg-slate-900">
                  Senior
                </option>
              </select>
            </div>
          </div>

          {/* TYPE */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">
              Interview Type
            </label>

            <div className="relative">
              <ClipboardList
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400"
                size={18}
              />

              <select
                name="interviewType"
                value={formData.interviewType}
                onChange={handleChange}
                disabled={loading}
                className="w-full appearance-none h-14 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 outline-none transition-all duration-300 pl-12 pr-4 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="quick" className="bg-slate-900">
                  Quick
                </option>

                <option value="technical" className="bg-slate-900">
                  Technical
                </option>

                <option value="full" className="bg-slate-900">
                  Full Interview
                </option>
              </select>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="flex-1 h-12 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Generate
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* FOOTER */}
        <div className="border-t border-white/10 px-6 py-3 bg-white/[0.02]">
          <div className="flex items-center justify-between text-xs">
            <p className="text-gray-500">
              Powered by AI
            </p>

            <div className="flex items-center gap-1 text-indigo-400">
              <Sparkles size={12} />
              Smart Questions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInterview;