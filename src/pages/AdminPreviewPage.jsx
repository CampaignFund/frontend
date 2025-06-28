// src/pages/AdminCampaignPreview.jsx
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Donate.css";
import "../css/Dashboard.css"; // if you have admin styles
import { CampaignContext } from "../store/campaignStore";

const AdminCampaignPreview = () => {
  const { apiURL, user } = useContext(CampaignContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  // grab the passed campaign, or bail if missing
  const campaign = state?.campaign;
  const [processing, setProcessing] = useState(false);

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }
  if (!campaign) {
    return <p className="loading-screen">No campaign data passed.</p>;
  }

  // destructure campaign fields
  const {
    _id: id,
    fundraiseTitle,
    userId,
    coverImage,
    fundraiseStory,
    donationAmount,
    totalAmountRaised,
    accountHolderName,
    accountNumber,
    bankName,
    ifscCode,
    cityName,
  } = campaign;

  // User personal details from userId
  const { fullName, email, phone } = userId || {};

  const percent = Math.min((donationAmount / totalAmountRaised) * 100, 100);

  const handleDecision = async (approve) => {
    setProcessing(true);
    try {
      if (approve) {
        await axios.put(
          `${apiURL}/api/admin/fund-raise/approve-fund/${id}`,
          {},
          { withCredentials: true }
        );
      } else {
        await axios.delete(`${apiURL}/api/admin/fund-raise/reject-fund/${id}`, {
          withCredentials: true,
        });
      }
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
      setProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="donate-page">
        {/* Left column: Campaign content */}
        <div className="donate-left">
          <img src={coverImage} alt="Campaign cover" className="donate-cover" />
          <h1 className="donate-title">{fundraiseTitle}</h1>
          <p className="donate-story">{fundraiseStory}</p>
        </div>

        {/* Right column: Progress, details, actions */}
        <div className="donate-right">
          {/* Progress bar */}
          <div className="progress-info">
            <span>PKR {donationAmount.toLocaleString()}</span>
            <span>raised of PKR {totalAmountRaised.toLocaleString()}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>

          {/* Fundraiser personal details */}
          <section
            className="fundraiser-details"
            style={{ marginTop: "1.5rem" }}
          >
            <h2>Fundraiser Details</h2>
            <p>
              <strong>Name:</strong> {fullName}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            {phone && (
              <p>
                <strong>Phone:</strong> {phone}
              </p>
            )}
            {cityName && (
              <p>
                <strong>City:</strong> {cityName}
              </p>
            )}
          </section>

          {/* Bank details */}
          <section className="bank-details" style={{ marginTop: "1rem" }}>
            <h2>Bank Details</h2>
            <p>
              <strong>Account Holder:</strong> {accountHolderName}
            </p>
            <p>
              <strong>Account Number:</strong> {accountNumber}
            </p>
            <p>
              <strong>Bank Name:</strong> {bankName}
            </p>
            <p>
              <strong>IFSC Code:</strong> {ifscCode}
            </p>
          </section>

          {/* Approve / Reject buttons */}
          {processing ? (
            <p style={{textAlign:'center', fontSize:'1rem', marginTop:"2rem"}}>Processing...</p>
          ) : (
            <div className="card-actions" style={{ marginTop: "2rem" }}>
              <button
                className="btn approve"
                disabled={processing}
                onClick={() => handleDecision(true)}
              >
                Approve
              </button>
              <button
                className="btn reject"
                disabled={processing}
                onClick={() => handleDecision(false)}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminCampaignPreview;
