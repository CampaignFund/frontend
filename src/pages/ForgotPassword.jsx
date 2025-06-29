import { useContext, useState } from 'react';
import '../css/Signin.css';
import { FiHome } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CampaignContext } from '../store/campaignStore';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { apiURL } = useContext(CampaignContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await axios.post(`${apiURL}/api/auth/forgot-password`, { email });

      if (res) {
        toast.success("Reset link sent to your email!");
        setTimeout(() => navigate('/'), 2000);
      }

      setError(null);
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        error.message;

      toast.error(errMsg);
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-body">
      <Toaster position="top-center" />
      <Link to="/" className="home-icon"><FiHome /></Link>
      <div className="signin-card">
        <h2 className="signin-title">Forgot Password</h2>

        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
          Enter your email and we’ll send you a reset link.
        </p>
        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <span className="error-message">{error}</span>}
          <button type="submit" className="btn primary-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                Sending
                <span className="spinner" />
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
