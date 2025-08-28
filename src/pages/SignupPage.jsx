import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/authStore";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isSigningup, signup, user } = useAuthStore();
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  //   if (!fullName.trim()) return toast.error("Full name is required");
  //   if (!email.trim()) return toast.error("Email is required");
  //   if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
  //   if (!password) return toast.error("Password is required");
  //   if (password.length < 6)
  //     return toast.error("Password must be at least 6 characters");

  //   return true;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ email, fullName, password });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-primary/10 rounded-xl p-6">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              <Mail className="h-4 w-4 opacity-70" />
              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <User className="h-4 w-4 opacity-70" />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 relative">
              <Lock className="h-4 w-4 opacity-70" />
              <input
                type={`${showPassword ? "text" : "password"}`}
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <Eye
                  className="h-4 w-4 opacity-70 cursor-pointer absolute right-5"
                  onClick={handleShowPassword}
                />
              ) : (
                <EyeOff
                  className="h-4 w-4 opacity-70 cursor-pointer absolute right-5"
                  onClick={handleShowPassword}
                />
              )}
            </label>
            <button
              type="submit"
              disabled={isSigningup}
              className="btn btn-primary rounded-lg font-semibold w-full text-white disabled:bg-primary/70 disabled:cursor-not-allowed"
            >
              {isSigningup ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center text-sm text-base-content/70 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <AuthImagePattern
        title="Welcome to Chat App"
        subtitle="Chat with your friends and family"
      />
    </div>
  );
};

export default SignupPage;
