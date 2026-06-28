import { useRef, useState } from "react";
import { useAuth } from "../hooks/authContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { loginHandler } = useAuth();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [error, setError] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmiting(true);

    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await loginHandler(credentials);
      navigate("/reading");
    } catch (err) {
      setError(err);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              ref={emailRef}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              ref={passwordRef}
              required
              placeholder="••••••••"
            />
          </div>
          <div>
            <button type="submit" disabled={isSubmiting}>
              {isSubmiting ? "Signing in ..." : "Sign In"}
            </button>
          </div>
        </div>
      </form>

      <div>
        <p>Don't have an account? </p>
        <Link to="/register">Register here</Link>
      </div>
    </div>
  );
};

export default Login;
