import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import "../css/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import axios from "axios";
import { CampaignContext } from "../store/campaignStore";

const Signin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const { setUser, apiURL } = useContext(CampaignContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log("Signing Up...");

      //Signup API Request
      const handleSignup = async () => {
        try {
          if (FormData.password != FormData.confirmPassword) return;
          const signupBody = {
            fullName: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          };

          const res = await axios.post(`${apiURL}/api/auth/signup`, signupBody);

          if (res) {
            console.log(res.data);
            setFormData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              phone: "",
            });
            setIsSignUp(false);
          }
        } catch (error) {
          console.log("Some error occured : ", error);
          setError(
            error.response.data.message ||
              error.response.data.msg ||
              error.message
          );
        }
      };

      handleSignup();
      setError(null);
    } else {
      console.log("Signing In...");

      //Signin API Request
     const handleSignin = async () => {
  try {
    console.log("📤 Sending login request...");
    const res = await axios.post(
      `${apiURL}/api/auth/login`,
      {
        email: formData.email,
        password: formData.password,
      },
      {
        withCredentials: true,
      }
    );

    console.log("✅ Response received from backend:");
    console.log(res);

    // Log cookie headers
    const setCookieHeader = res.headers["set-cookie"];
    console.log("🍪 Set-Cookie Header:", setCookieHeader);

    // Log all response headers
    console.log("📦 Response Headers:", res.headers);

    // Log token (if returned in body too)
    if (res.data?.token) {
      console.log("🔐 Token in response body:", res.data.token);
    }

    // Log user info
    console.log("👤 Logged-in User:", res.data.user);

    // Check document.cookie (if NOT httpOnly)
    console.log("🕵️ Cookie in browser (document.cookie):", document.cookie);

    // Set user
    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    });

    navigate("/");
  } catch (error) {
    console.log("❌ Some error occurred:");
    console.log(error);

    setError(
      error.response?.data?.message ||
      error.response?.data?.msg ||
      error.message
    );
  }
};


      handleSignin();
      setError(null);
    }
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  };

  const handleGoogleLogin = async () => {
    window.location.href = `${apiURL}/api/auth/google`;
  };

  return (
    <div className="signin-body">
      <Link to="/" className="home-icon">
        <FiHome />
      </Link>
      <div className="signin-card">
        <h2 className="signin-title">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>

        {!isSignUp && (
          <button className="btn google-btn" onClick={handleGoogleLogin}>
            <span className="btn-icon">
              <FcGoogle size={20} />
            </span>
            <span>Continue with Google</span>
          </button>
        )}

        <div className="divider">
          <span className="line" />
          <span className="or">OR</span>
          <span className="line" />
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              required
              onChange={handleFormChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            required
            onChange={handleFormChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            required
            onChange={handleFormChange}
          />
          {error && <span className="error-message">{error}</span>}
          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              required
              onChange={handleFormChange}
            />
          )}
          {isSignUp && (
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              required
              onChange={handleFormChange}
            />
          )}
          <button type="submit" className="btn primary-btn">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="toggle-text">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span
            className="toggle-link"
            onClick={() => {
              setIsSignUp((prev) => !prev);
              setError(null);
            }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
        <p className="reset-text">
          Forgot password?
          <Link to={"/forgot-password"}>
            <span className="reset-link">Reset Password</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
