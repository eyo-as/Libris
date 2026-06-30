import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";
import {
  FiUser,
  FiMail,
  FiLock,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import { FaBook } from "react-icons/fa";

const Register = () => {
  const { registerHandler } = useAuth();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [error, setError] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmiting(true);

    const userData = {
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await registerHandler(userData);
      navigate("/reading");
    } catch (err) {
      setError(err);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    /* h-screen overflow-hidden locks the browser frame completely */
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-[#000000] dark:bg-[#FFFFFF] px-4 text-[#FFFFFF] dark:text-[#000000] antialiased transition-colors duration-300">
      {/* Responsive Compact Card */}
      <div className="w-full max-w-md bg-[#000000] dark:bg-[#FFFFFF] border border-[#FFFFFF]/20 dark:border-[#000000]/20 rounded-xl p-6 sm:p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#FFFFFF] dark:bg-[#000000] text-[#000000] dark:text-[#FFFFFF] text-xl mb-3 border border-[#000000] dark:border-[#FFFFFF]">
            <FaBook />
          </div>
          <h2 className="text-xl sm:text-2xl tracking-normal">
            Create account
          </h2>
          <p className="mt-1 text-xs text-[#FFFFFF]/60 dark:text-[#000000]/60">
            Join Libris to track your reading journey.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500 text-xs text-red-400 flex items-start gap-2 animate-shake">
            <FiAlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-2xs text-[#FFFFFF]/80 dark:text-[#000000]/80 mb-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#FFFFFF]/40 dark:text-[#000000]/40">
                <FiUser className="w-4 h-4" />
              </span>
              <input
                type="text"
                ref={usernameRef}
                required
                placeholder="Choose your reader handle"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#FFFFFF]/20 dark:border-[#000000]/20 bg-[#000000] dark:bg-[#FFFFFF] text-[#FFFFFF] dark:text-[#000000] placeholder-[#FFFFFF]/30 dark:placeholder-[#000000]/30 focus:outline-none focus:border-[#FFFFFF] dark:focus:border-[#000000] text-xs transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-2xs text-[#FFFFFF]/80 dark:text-[#000000]/80 mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#FFFFFF]/40 dark:text-[#000000]/40">
                <FiMail className="w-4 h-4" />
              </span>
              <input
                type="email"
                ref={emailRef}
                required
                placeholder="you@example.com"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#FFFFFF]/20 dark:border-[#000000]/20 bg-[#000000] dark:bg-[#FFFFFF] text-[#FFFFFF] dark:text-[#000000] placeholder-[#FFFFFF]/30 dark:placeholder-[#000000]/30 focus:outline-none focus:border-[#FFFFFF] dark:focus:border-[#000000] text-xs transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-2xs text-[#FFFFFF]/80 dark:text-[#000000]/80 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#FFFFFF]/40 dark:text-[#000000]/40">
                <FiLock className="w-4 h-4" />
              </span>
              <input
                type="password"
                ref={passwordRef}
                required
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#FFFFFF]/20 dark:border-[#000000]/20 bg-[#000000] dark:bg-[#FFFFFF] text-[#FFFFFF] dark:text-[#000000] placeholder-[#FFFFFF]/30 dark:placeholder-[#000000]/30 focus:outline-none focus:border-[#FFFFFF] dark:focus:border-[#000000] text-xs transition-all"
              />
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmiting}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#FFFFFF] dark:bg-[#000000] text-[#000000] dark:text-[#FFFFFF] border border-[#FFFFFF] dark:border-[#000000] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 text-xs font-bold cursor-pointer hover:bg-[#000000] hover:text-[#FFFFFF] dark:hover:bg-[#FFFFFF] dark:hover:text-[#000000] hover:border-[#FFFFFF] dark:hover:border-[#000000]"
            >
              {isSubmiting ? (
                <>
                  <FiLoader className="animate-spin h-4 w-4" />
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#FFFFFF]/10 dark:border-[#000000]/10 text-center">
          <p className="text-xs text-[#FFFFFF]/60 dark:text-[#000000]/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#FFFFFF] dark:text-[#000000] font-bold underline underline-offset-4 decoration-1 hover:opacity-80 transition-all"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
