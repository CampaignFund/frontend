import { useState } from 'react';
import '../css/Dashboard.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard=()=> {
  const [pendingCampaigns, setPendingCampaigns] = useState([
    { id: 1, title: 'Build a School in Bihar', creator: '98ZAFAR' },
    { id: 2, title: 'Clean Water for Villages', creator: 'MeeraG' },
  ]);
  const [pendingDeactivations, setPendingDeactivations] = useState([
    { id: 1, username: 'User123', email: 'user123@example.com' },
    { id: 2, username: 'JohnDoe', email: 'john@example.com' },
  ]);

  const handleApproveCampaign = id => {
    setPendingCampaigns(cs => cs.filter(c => c.id !== id));
    console.log('Approved campaign', id);
  };
  const handleRejectCampaign = id => {
    setPendingCampaigns(cs => cs.filter(c => c.id !== id));
    console.log('Rejected campaign', id);
  };
  const handleApproveDeactivation = id => {
    setPendingDeactivations(ds => ds.filter(d => d.id !== id));
    console.log('Approved deactivation', id);
  };
  const handleRejectDeactivation = id => {
    setPendingDeactivations(ds => ds.filter(d => d.id !== id));
    console.log('Rejected deactivation', id);
  };

  return (<>
  <Navbar></Navbar>
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <section className="admin-section">
        <h2>Pending Campaign Approvals</h2>
        <div className="admin-list">
          {pendingCampaigns.map(c => (
            <div key={c.id} className="admin-card">
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
            <div key={d.id} className="admin-card">
              <div>
                <p className="card-title">{d.username}</p>
                <p className="card-sub">{d.email}</p>
              </div>
              <div className="card-actions">
                <button className="btn approve" onClick={() => handleApproveDeactivation(d.id)}>Approve</button>
                <button className="btn reject" onClick={() => handleRejectDeactivation(d.id)}>Reject</button>
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
