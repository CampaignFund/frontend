import { useContext, useState } from 'react';
import '../css/Signin.css';
import { FiHome } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CampaignContext } from '../store/campaignStore';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const {apiURL} = useContext(CampaignContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const handleVerifyEmail = async()=>{
                const res = await axios.post(`${apiURL}/api/auth/forgot-password`, {email});

                if(res){
                    console.log(res);
                    console.log('Password reset link sent to:', email);
                    navigate('/');
                }
            }

            handleVerifyEmail();
            setError(null);
        } catch (error) {
            console.log("Some error occured : ", error);
            setError(error.response.data.message || error.response.data.msg || error.message);
        }
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
                    {error && <span className='error-message'>{error}</span>}
                    <button type="submit" className="btn primary-btn">Send Reset Link</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
