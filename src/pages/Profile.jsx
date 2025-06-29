import { useContext, useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CampaignContext } from "../store/campaignStore";
import axios from "axios";
import "../css/Profile.css";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const defaultProfile = "/UserProfile.jpg";
  const { user, setUser, apiURL } = useContext(CampaignContext);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    fullName: "",
    phone: "",
    cityName:"",
    cnicImage:"",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(defaultProfile);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user profile on mount
  useEffect(() => {
    if (!user) return navigate("/signin");
    (async () => {
      try {
        const res = await axios.get(`${apiURL}/api/user/profile`, {
          withCredentials: true,
        });
        const u = res.data.user;
        setUser(u);
        localStorage.setItem("user", JSON.stringify(u));
        setUpdatedUser({
          fullName: u.fullName || "",
          phone: u.phone || "",
          cityName: u.cityName || ""
        });
        console.log("Fetched User:", res.data.user);

        setPreviewImage(u.profilePhoto || defaultProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
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
      formData.append("fullName", updatedUser.fullName);
      formData.append("phone", updatedUser.phone);
      formData.append("cityName", updatedUser.cityName);
      if (selectedFile) {
        formData.append("cnicImage", selectedFile);
      }

      setIsSending(true);

      const res = await axios.put(
        `${apiURL}/api/user/update-profile`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.user) {
        setEditMode(false);
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Profile updated successfully!");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    } finally {
      setIsSending(false);
    }
  };

  const handleDeactivateAccount = async () => {
    try {
      const res = await axios.post(
        `${apiURL}/api/user/account-deletion/request`,
        {},
        { withCredentials: true }
      );

      if (res.data) {
        setError(null);
        toast.success("Deactivation request sent successfully.");
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        error.message;
      console.log("Some error occurred:", err);
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  if (!user) return <div className="profile-container">Loading...</div>;

  return (
    <div className="profile-container">
      <Toaster />
      <div className="profile-card">
        <Link to="/" className="home-icon">
          <FiHome />
        </Link>

        <div className="profile-image">
          <img src={previewImage} alt="Profile" />
        </div>

        {/* {editMode && (
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
        )} */}

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
              <p>{user.phone || "N/A"}</p>
            )}
          </div>
          <div className="profile-field">
            <label>City</label>
            {editMode ? (
              <input
                name="cityName"
                value={updatedUser.cityName}
                onChange={handleChange}
              />
            ) : (
              <p>{user.cityName || "N/A"}</p>
            )}
          </div>
          {editMode ? (
            <div className="profile-field">
              <label htmlFor="cnicImage" className="cnic">
                Choose CNIC Image
              </label>
              <input
                id="cnicImage"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="profile-field"
              />
            </div>
          ) : (
            <div className="profile-field">
              <label>CNIC</label>
              <p>{user.cnicImage ? "Updated" : "Missing"}</p>
            </div>
          )}

          {!editMode && (
            <div className="profile-field">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
          )}
        </div>

        <div className="profile-actions">
          {editMode ? (
            <button
              className="btn save"
              onClick={handleSave}
              disabled={isSending}
            >
              {isSending ? <>Updating...</> : <>Save Changes</>}
            </button>
          ) : (
            <button className="btn edit" onClick={() => setEditMode(true)}>
              Edit Info
            </button>
          )}
        </div>

        <button className="btn danger" onClick={handleDeactivateAccount}>
          Deactivate Account
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Profile;
