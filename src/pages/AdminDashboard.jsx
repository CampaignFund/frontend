import { useContext, useEffect, useState } from 'react';
import '../css/Dashboard.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { CampaignContext } from '../store/campaignStore';

const Dashboard = () => {

  const { apiURL } = useContext(CampaignContext)

  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [pendingDeactivations, setPendingDeactivations] = useState([]);

  useEffect(() => {
    const fetchPendingDeactivations = async () => {
      try {
        const res = await axios.get(`${apiURL}/api/admin/account-deletion/pending-requests`, { withCredentials: true });

        if (res.data) {
          console.log(res.data);
          const requests = res.data.requests.filter(c=>(c.status==='pending'));
          setPendingDeactivations(requests);
        }
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ",error);
      }
    }

    fetchPendingDeactivations();

  }, [])
  const handleApproveCampaign = id => {
    setPendingCampaigns(cs => cs.filter(c => c.id !== id));
    console.log('Approved campaign', id);
  };
  const handleRejectCampaign = id => {
    setPendingCampaigns(cs => cs.filter(c => c.id !== id));
    console.log('Rejected campaign', id);
  };
  const handleApproveDeactivation = acc => {
    const approveDeactivation = async()=>{
      try {
        const res = await axios.put(`${apiURL}/api/admin/account-deletion/approve/${acc._id}`, {}, { withCredentials: true });

        if (res.data) {
          console.log(res.data);
          setPendingDeactivations(ds => ds.filter(d => d._id !== acc._id));
        }
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ",error);
      }
    }

    approveDeactivation();
    console.log('Approved deactivation', acc._id);
  };
  const handleRejectDeactivation = acc => {
    const rejectDeactivation = async()=>{
      try {
        const res = await axios.put(`${apiURL}/api/admin/account-deletion/reject/${acc._id}`, {}, { withCredentials: true });

        if (res.data) {
          console.log(res.data);
          setPendingDeactivations(ds => ds.filter(d => d._id !== acc._id));
        }
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ",error);
      }
    }

    rejectDeactivation();
    console.log('Rejected deactivation', acc._id);
  };

  return (<>
    <Navbar></Navbar>
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <section className="admin-section">
        <h2>Pending Campaign Approvals</h2>
        <div className="admin-list">
          {pendingCampaigns.map(c => (
            
            <div key={c._id} className="admin-card">
              <div>
                <p className="card-title">{c.title}</p>
                <p className="card-sub">By {c.creator}</p>
              </div>
              <div className="card-actions">
                <button className="btn approve" onClick={() => handleApproveCampaign(c.id)}>Approve</button>
                <button className="btn reject" onClick={() => handleRejectCampaign(c.id)}>Reject</button>
              </div>
            </div>
          ))}
          {pendingCampaigns.length === 0 && <p className="empty">No pending campaigns</p>}
        </div>
      </section>

      <section className="admin-section">
        <h2>Pending Account Deactivations</h2>
        <div className="admin-list">
          {pendingDeactivations.map(d => (
            <div key={d._id} className="admin-card">
              <div>
                <p className="card-title">{d.fullName}</p>
                <p className="card-sub">{d.email}</p>
              </div>
              <div className="card-actions">
                <button className="btn approve" onClick={() => handleApproveDeactivation(d)}>Approve</button>
                <button className="btn reject" onClick={() => handleRejectDeactivation(d)}>Reject</button>
              </div>
            </div>
          ))}
          {pendingDeactivations.length === 0 && <p className="empty">No pending deactivations</p>}
        </div>
      </section>
    </div>
    <Footer></Footer>
  </>);
}

export default Dashboard;
