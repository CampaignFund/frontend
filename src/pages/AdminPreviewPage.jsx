// src/pages/AdminCampaignPreview.jsx
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../css/Donate.css'
import '../css/Dashboard.css'      // if you have admin styles
import { CampaignContext } from '../store/campaignStore'

const AdminCampaignPreview = () => {
  const { apiURL, user } = useContext(CampaignContext)
  const { state } = useLocation()
  const navigate = useNavigate()

  // grab the passed campaign, or bail if missing
  const campaign = state?.campaign
  const [processing, setProcessing] = useState(false)

  if (!user || user.role !== 'admin') {
    navigate('/')
    return null
  }
  if (!campaign) {
    return <p className="loading-screen">No campaign data passed.</p>
  }

  // destructure what you need
  const {
    _id: id,
    fundraiseTitle,
    creator,
    coverImage,
    fundraiseStory,
    donationAmount,
    totalAmountRaised,
    reports = [],
  } = campaign

  const percent = Math.min((donationAmount / totalAmountRaised) * 100, 100)

  const handleDecision = async (approve) => {
    setProcessing(true)
    try {
      if (approve) {
        await axios.put(
          `${apiURL}/api/admin/fund-raise/approve-fund/${id}`,
          {},
          { withCredentials: true }
        )
      } else {
        await axios.delete(
          `${apiURL}/api/admin/fund-raise/reject-fund/${id}`,
          { withCredentials: true }
        )
      }
      navigate('/admin-dashboard')
    } catch (err) {
      console.error(err)
      setProcessing(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="donate-page">
        <div className="donate-left">
          <img
            src={coverImage}
            alt="Campaign cover"
            className="donate-cover"
          />
          <h1 className="donate-title">{fundraiseTitle}</h1>
          <p className="donate-story">{fundraiseStory}</p>

        </div>

        <div className="donate-right">
          <div className="progress-info">
            <span>PKR {donationAmount.toLocaleString()}</span>
            <span>raised of PKR {totalAmountRaised.toLocaleString()}</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="card-actions" style={{ marginTop: '1rem' }}>
            <button
              className="btn approve"
              disabled={processing}
              onClick={() => handleDecision(true)}
            >
              {processing ? 'Processing…' : 'Approve'}
            </button>
            <button
              className="btn reject"
              disabled={processing}
              onClick={() => handleDecision(false)}
            >
              {processing ? 'Processing…' : 'Reject'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AdminCampaignPreview