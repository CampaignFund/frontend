import { useState } from 'react';
import '../css/Profile.css';
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Profile() {
    const defaultProfile = '/UserProfile.jpg';
    const [user, setUser] = useState({
        name: 'Mohammad Zafar',
        email: 'zafar@example.com',
        username: '98ZAFAR',
        phone: '9876543210',
        location: 'Howrah, India'
    });

    const [editMode, setEditMode] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setEditMode(false);
        console.log('Updated Info:', user);
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
            <Link to="/" className="home-icon"><FiHome /></Link>
                <div className="profile-image">
                    <img src={defaultProfile} alt="Profile" />
                </div>
                <h2>{user.name}</h2>

                <div className="profile-fields">
                    {Object.entries(user).map(([key, value]) => (
                        <div className="profile-field" key={key}>
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            {editMode ? (
                                <input name={key} value={value} onChange={handleChange} />
                            ) : (
                                <p>{value}</p>
                            )}
                        </div>
                    ))}
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
