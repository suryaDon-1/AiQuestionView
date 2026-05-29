import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice.js";
import toast from "react-hot-toast";

function Login({ setAuthModal }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();

    // PREVENT MULTIPLE CLICKS
    if (loading) return;

    setLoading(true);

    const toastId = toast.loading("Logging in...");

    try {
      const res = await dispatch(loginUser(formdata));

      console.log(res);

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Login Successful", {
          id: toastId,
        });

        setAuthModal(null);
      } else {
        toast.error("Invalid Credentials", {
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

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handlesubmit} className="space-y-5">
      {/* EMAIL */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          required
          disabled={loading}
          value={formdata.email}
          onChange={handlechange}
          placeholder="Enter your email"
          className="w-full h-12 px-4 rounded-xl border border-white/10 
          bg-white/5 text-white placeholder-gray-500
          focus:outline-none focus:border-blue-500
          transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">
          Password
        </label>

        <input
          type="password"
          name="password"
          required
          disabled={loading}
          value={formdata.password}
          onChange={handlechange}
          placeholder="Enter your password"
          className="w-full h-12 px-4 rounded-xl border border-white/10 
          bg-white/5 text-white placeholder-gray-500
          focus:outline-none focus:border-blue-500
          transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 
        text-white font-semibold shadow-lg
        hover:scale-[1.01] transition duration-300
        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
        flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Logging In...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}

export default Login;