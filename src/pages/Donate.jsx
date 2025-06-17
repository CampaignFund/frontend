import { useContext, useEffect, useState } from 'react';
import '../css/Donate.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DonateModal from '../components/DonationPayment';
import axios from 'axios';
import { CampaignContext } from '../store/campaignStore';
import { useParams } from 'react-router-dom';

const Donate = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [fund, setFund] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  const [showReportForm, setShowReportForm] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [reports, setReports] = useState([]);
  const [newReportDesc, setNewReportDesc] = useState('');
  const [newReportImage, setNewReportImage] = useState(null);

  const shareUrl = window.location.href;
  const { apiURL, user } = useContext(CampaignContext);
  const params = useParams();
  const fundId = new window.URLSearchParams(params).get('id');


  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${apiURL}/api/fund/fund-list/${fundId}`);
        if (res.data) {
          if (user?.email === res.data.fund.userId.email) setIsAuthor(true);
          setFund(res.data.fund);
          setReports(res.data.reports);
        }
      } catch (error) {
        console.log("Some error occured : ", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiURL, fundId, user]);

  const handleDonate = async (paymentData) => {
    try {
      setIsProcessing(true);
      const res = await axios.post(
        `${apiURL}/api/donar/donate`,
        paymentData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (res) {
        setModalOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.log('Some error occured : ', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: fund.fundraiseTitle,
      text: `Support "${fund.fundraiseTitle}" on FundRaiseTogether!`,
      url: shareUrl,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); }
      catch { /* ignore */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } catch {
      alert(`Please copy this link:\n${shareUrl}`);
    }
  };

  const toggleReportForm = () => setShowReportForm(prev => !prev);
  const toggleShowReports = () => setShowReports(prev => !prev);

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fundId', fundId);
    formData.append('description', newReportDesc);
    formData.append('image', newReportImage);

    setIsProcessing(true);
    try {
      const res = await axios.post(`${apiURL}/api/fund/fund-report`, formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        })

      if (res.data) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Some error occured : ", error);
    }
    finally {
      setIsProcessing(false);
      setNewReportDesc('');
      setNewReportImage(null);
      setShowReportForm(false);
      setShowReports(false);
    }
  };

  const percent = Math.min((fund?.donationAmount / fund?.totalAmountRaised) * 100, 100);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <p className="loading-screen">Loading...</p>
      ) : (
        <div className="donate-page">
          <div className="donate-left">
            <img src={fund?.coverImage} alt="Campaign cover" className="donate-cover" />
            <h1 className="donate-title">{fund?.fundraiseTitle}</h1>
            <p className="donate-story">{fund?.fundraiseStory}</p>

            {isAuthor && (
              <>
                <button className="share-button" onClick={toggleReportForm}>
                  {showReportForm ? 'Cancel Report' : 'Create Report'}
                </button>

                {showReportForm && (
                  <form className="report-form" onSubmit={handleReportSubmit}>
                    <textarea
                      required
                      placeholder="Report description..."
                      value={newReportDesc}
                      onChange={e => setNewReportDesc(e.target.value)}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setNewReportImage(e.target.files[0])}
                    />
                    <button type="button" className="submit-report-button" disabled={isProcessing} onClick={handleReportSubmit}>
                      {isProcessing?'Processing...':'Submit Report'}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          <div className="donate-right">
            <div className="progress-info">
              <span>PKR {fund?.donationAmount.toLocaleString()}</span>
              <span>raised of PKR {fund?.totalAmountRaised.toLocaleString()}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <button className="donate-button" onClick={() => setModalOpen(true)}>
              Donate Now
            </button>
            <button className="share-button" onClick={handleShare}>
              Share Now
            </button>
            <button className="report-button" onClick={toggleShowReports}>
              {showReports ? 'Close Reports' : 'Show Reports'}
            </button>

            {showReports && (
              <div className="reports-container">
                {reports.length === 0 ? (
                  <p>No reports yet.</p>
                ) : (
                  reports?.map((r, i) => (
                    <div key={i} className="report-item">
                      <p>{r.description}</p>
                      {r.image && <img src={r.image} alt="Report" />}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <DonateModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onDonate={handleDonate}
        fund={fund}
        isProcessing={isProcessing}
      />
      <Footer />
    </>
  );
};

export default Donate;
