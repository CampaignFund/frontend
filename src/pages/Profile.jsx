import { useContext, useEffect, useState } from 'react';
import '../css/Profile.css';
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { CampaignContext } from '../store/campaignStore';
import axios from 'axios';

export default function Profile() {
    const defaultProfile = '/UserProfile.jpg';
    const { user, apiURL} = useContext(CampaignContext)
    const [updatedUser, setUpdatedUser] = useState(user);

    const [editMode, setEditMode] = useState(false);

    useEffect(()=>{
        const handleFetchProfile = async()=>{
            try {
                const res = await axios.get(`${apiURL}/api/user/profile`,{
                    withCredentials:true
                });

                if(res){
                    console.log(res.data);
                }
            } catch (error) {
                console.log("Some error occured : ", error);
            }
        }

        handleFetchProfile();
    },[])

    const handleChange = e => {
        const { name, value } = e.target;
        setUpdatedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setEditMode(false);
        console.log('Updated Info:', updatedUser);
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <Link to="/" className="home-icon"><FiHome /></Link>
                <div className="profile-image">
                    <img src={user.profilePhoto || defaultProfile} alt="Profile" />
                </div>
                <h2>{user.fullName}</h2>

                <div className="profile-fields">
                    <div className="profile-field">
                        <label>Full Name</label>
                        {editMode ? (
                            <input name='fullName' value={updatedUser.fullName} onChange={handleChange} />
                        ) : (
                            <p>{user.fullName}</p>
                        )}
                    </div>
                    <div className="profile-field">
                        <label>Email</label>
                        {editMode ? (
                            <input name='email' value={updatedUser.email} onChange={handleChange} />
                        ) : (
                            <p>{user.email}</p>
                        )}
                    </div>
                    <div className="profile-field">
                        <label>Phone</label>
                        {editMode ? (
                            <input name='phone' value={updatedUser.phone} onChange={handleChange} />
                        ) : (
                            <p>{user.phone}</p>
                        )}
                    </div>
                </div>

                <div className="profile-actions">
                    {editMode ? (
                        <button className="btn save" onClick={handleSave}>Save Changes</button>
                    ) : (
                        <button className="btn edit" onClick={() => setEditMode(true)}>Edit Info</button>
                    )}
                </div>

                <button className="btn danger">Deactivate Account</button>
            </div>
        </div>
    );
}
