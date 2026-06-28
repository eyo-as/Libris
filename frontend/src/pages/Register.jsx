import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/authContext";

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
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await registerHandler(userData);
      navigate("/items");
    } catch (err) {
      setError(err);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <>
      <div>
        <h2>Create account</h2>
      </div>

      <div>{error && <div>{error}</div>}</div>

      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Username: </label>
            <input
              type="text"
              ref={usernameRef}
              required
              placeholder="username"
            />
          </div>
          <div>
            <label>Email: </label>
            <input type="email" ref={emailRef} required placeholder="email" />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              ref={passwordRef}
              required
              placeholder="password"
            />
          </div>

          <div>
            <button type="submit" disabled={isSubmiting}>
              {isSubmiting ? "Creating account... " : "Register"}
            </button>
          </div>
        </div>
      </form>

      <div>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
