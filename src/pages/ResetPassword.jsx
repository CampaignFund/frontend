import {  useContext, useState } from 'react';
import '../css/Signin.css';
import { FiHome } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CampaignContext } from '../store/campaignStore';


const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const {apiURL} = useContext(CampaignContext)

    const params = useParams();
    const navigate = useNavigate();

    const resetToken = new window.URLSearchParams(params).get('resetToken');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const handleResetPassword = async()=>{
                const res = await axios.post(`${apiURL}/api/auth/reset-password/${resetToken}`, {newPassword:password});

                if(res){
                    console.log(res);
                    console.log('Password reset successfully:', password);
                    navigate('/');
                }
            }

            handleResetPassword();
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
                    {error && <span className='error-message'>{error}</span>}
                    <button type="submit" className="btn primary-btn">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
