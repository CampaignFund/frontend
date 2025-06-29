import { useContext, useState } from "react";
import "../css/Signin.css";
import { FiHome } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CampaignContext } from "../store/campaignStore";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { apiURL } = useContext(CampaignContext);
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${apiURL}/api/auth/reset-password/${resetToken}`,
        { newPassword: password }
      );

      if (res) {
        toast.success("Password reset successfully!");
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        error.message;

      console.error("Reset error:", errMsg);
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-body">
      <Toaster />
      <Link to="/" className="home-icon">
        <FiHome />
      </Link>
      <div className="signin-card">
        <h2 className="signin-title">Reset Password</h2>

        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <span className="error-message">{error}</span>}
          <button type="submit" className="btn primary-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                Resetting
                <span className="spinner" />
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
