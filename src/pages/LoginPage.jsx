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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLogining, login, user } = useAuthStore();
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
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
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                Get started to try our services
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
              disabled={isLogining}
              className="btn btn-primary rounded-lg font-semibold w-full text-white disabled:bg-primary/70 disabled:cursor-not-allowed"
            >
              {isLogining ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="text-center text-sm text-base-content/70 mt-5">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
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

export default LoginPage;
