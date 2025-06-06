import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import '../css/Signin.css';

const Signin = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log('Signing Up...');
    } else {
      console.log('Signing In...');
    }
  };

  return (
    <div className="signin-body">
      <div className="signin-card">
        <h2 className="signin-title">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>

        {!isSignUp && (
          <button className="btn google-btn">
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
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />
          )}
          <button type="submit" className="btn primary-btn">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className="toggle-text">
          {isSignUp
            ? 'Already have an account? '
            : "Don't have an account? "}
          <span
            className="toggle-link"
            onClick={() => setIsSignUp((prev) => !prev)}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
