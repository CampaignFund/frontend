import { useState } from 'react';
import '../css/Signin.css';
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log('Password reset successfully:', password);
    };

    return (
        <div className="signin-body">
            <Link to="/" className="home-icon"><FiHome /></Link>
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
                    <button type="submit" className="btn primary-btn">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
