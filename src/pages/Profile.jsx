import { useContext, useEffect, useState } from 'react';
import { FiHome } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { CampaignContext } from '../store/campaignStore';
import axios from 'axios';
import '../css/Profile.css';

const Profile = () => {
  const defaultProfile = '/UserProfile.jpg';
  const { user, setUser, apiURL } = useContext(CampaignContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    fullName: '',
    phone: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(defaultProfile);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user profile on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${apiURL}/api/user/profile`, {
          withCredentials: true,
        });
        const u = res.data.user;
        setUser(u);
        localStorage.setItem('user', JSON.stringify(u));
        setUpdatedUser({
          fullName: u.fullName || '',
          phone: u.phone || '',
        });
        setPreviewImage(u.profilePhoto || defaultProfile);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    })();
  }, [apiURL, setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('fullName', updatedUser.fullName);
      formData.append('phone', updatedUser.phone);
      if (selectedFile) {
        formData.append('profilePhoto', selectedFile);
      }

      setIsSending(true);
      const res = await axios.put(
        `${apiURL}/api/user/update-profile`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (res.data.user) {
        setEditMode(false);
        setIsSending(false);
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleDeactivateAccount = async()=>{
    try {
        const res = await axios.post(`${apiURL}/api/user/account-deletion/request`, {}, {withCredentials:true});

        if(res.data){
            console.log(res.data);
            setError(null);
        }
    } catch (error) {
        console.log('Some error occured : ',error);
        setError(error.response.data.message || error.response.data.msg || error.message);
    }
  }

  if (!user) return <div className="profile-container">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <Link to="/" className="home-icon">
          <FiHome />
        </Link>

        <div className="profile-image">
          <img src={previewImage} alt="Profile" />
        </div>

        {editMode && (
          <div className="file-input-wrapper">
            <label htmlFor="profile-photo" className="file-input-label">
              Choose Profile Picture
            </label>
            <input
              id="profile-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="file-input"
            />
          </div>
        )}

        <h2>{user.fullName}</h2>

        <div className="profile-fields">
          <div className="profile-field">
            <label>Full Name</label>
            {editMode ? (
              <input
                name="fullName"
                value={updatedUser.fullName}
                onChange={handleChange}
              />
            ) : (
              <p>{user.fullName}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Phone</label>
            {editMode ? (
              <input
                name="phone"
                value={updatedUser.phone}
                onChange={handleChange}
              />
            ) : (
              <p>{user.phone || 'N/A'}</p>
            )}
          </div>

          {!editMode && (
            <div className="profile-field">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
          )}
        </div>

        <div className="profile-actions">
          {editMode ? (
            <button className="btn save" onClick={handleSave}>
              {isSending? <>Updating...</> : <>Save Changes</>}
            </button>
          ) : (
            <button className="btn edit" onClick={() => setEditMode(true)}>
              Edit Info
            </button>
          )}
        </div>

        <button className="btn danger" onClick={handleDeactivateAccount}>Deactivate Account</button>
        {error && ( <div className="error-message">{error}</div> )}
      </div>
    </div>
  );
};

export default Profile;
