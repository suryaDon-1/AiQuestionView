import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authSlice.js";
import toast from "react-hot-toast";

function Register({ setAuthModal }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();

    // PREVENT MULTIPLE CLICKS
    if (loading) return;

    setLoading(true);

    const toastId = toast.loading("Creating Account...");

    try {
      const res = await dispatch(registerUser(formdata));

      console.log(res);

      // SUCCESS
      if (res?.meta?.requestStatus === "fulfilled") {
        toast.success("Account Created Successfully", {
          id: toastId,
        });

        setAuthModal(null);
      } else {
        toast.error("Failed To Create Account", {
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
    <div className="w-full">
      <form onSubmit={handlesubmit} className="space-y-4">
        {/* NAME */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            required
            disabled={loading}
            value={formdata.name}
            onChange={handlechange}
            placeholder="Enter your name"
            className="
              w-full
              px-4 py-3
              rounded-2xl
              border border-white/10
              bg-white/5
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          />
        </div>

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
            className="
              w-full
              px-4 py-3
              rounded-2xl
              border border-white/10
              bg-white/5
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
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
            placeholder="Create a password"
            className="
              w-full
              px-4 py-3
              rounded-2xl
              border border-white/10
              bg-white/5
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            py-3.5
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            transition
            duration-300
            font-semibold
            shadow-lg
            shadow-blue-500/20
            disabled:opacity-70
            disabled:cursor-not-allowed
            disabled:hover:scale-100
            flex
            items-center
            justify-center
            gap-2
          "
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
}

export default Register;