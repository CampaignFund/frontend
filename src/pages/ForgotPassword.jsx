import { useState } from 'react';
import '../css/Signin.css';
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Password reset link sent to:', email);
    };

    return (
        <div className="signin-body">
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
                    <button type="submit" className="btn primary-btn">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
