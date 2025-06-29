import { useContext, useEffect, useState } from "react";
import "../css/Dashboard.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { CampaignContext } from "../store/campaignStore";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [loadingApproveCampaigns, setLoadingApproveCampaigns] = useState([]);
  const [loadingRejectCampaigns, setLoadingRejectCampaigns] = useState([]);
  const [loadingApproveDeactivations, setLoadingApproveDeactivations] =
    useState([]);
  const [loadingRejectDeactivations, setLoadingRejectDeactivations] = useState(
    []
  );

  const { user, apiURL } = useContext(CampaignContext);
  const navigate = useNavigate();

  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [pendingDeactivations, setPendingDeactivations] = useState([]);

  //Fetching Data on Page Render
  useEffect(() => {
    if (!user || user?.role !== "admin") return navigate("/");

    //Fetching Pending Accounts Deactivation
    const fetchPendingDeactivations = async () => {
      try {
        const res = await axios.get(
          `${apiURL}/api/admin/account-deletion/pending-requests`,
          { withCredentials: true }
        );

        if (res.data) {
          // console.log(res.data);
          const requests = res.data.requests.filter(
            (c) => c.status === "pending"
          );
          setPendingDeactivations(requests);
        }
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ", error);
      }
    };

    fetchPendingDeactivations();

    //Fetching Pending Campaigns for Approval
    const fetchPendingCampaigns = async () => {
      try {
        const res = await axios.get(
          `${apiURL}/api/admin/fund-raise/pending-funds`,
          { withCredentials: true }
        );

        if (res.data) {
          console.log(res.data);
          const requests = res.data.pendingFunds.filter((c) => !c.isApproved);
          setPendingCampaigns(requests);
        }
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ", error);
      }
    };

    fetchPendingCampaigns();
  }, []);

  //Handling Approval & Rejection of Campaigns
  const handleApproveCampaign = (acc) => {
    const approveCampaign = async () => {
      setLoadingApproveCampaigns((prev) => [...prev, acc._id]);
      try {
        const res = await axios.put(
          `${apiURL}/api/admin/fund-raise/approve-fund/${acc._id}`,
          {},
          { withCredentials: true }
        );

        if (res.data) {
          // console.log(res.data);
          setPendingCampaigns((cs) => cs.filter((c) => c._id !== acc._id));
          toast.success("Campaign approved!");
          // console.log('Approved campaign', acc._id);
        }
        setLoadingApproveCampaigns((prev) =>
          prev.filter((id) => id !== acc._id)
        );
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ", error);
        toast.error("Failed to approve campaign.");
      }
    };

    approveCampaign();
  };
  const handleRejectCampaign = (acc) => {
    const rejectCampaign = async () => {
      setLoadingRejectCampaigns((prev) => [...prev, acc._id]);
      try {
        const res = await axios.delete(
          `${apiURL}/api/admin/fund-raise/reject-fund/${acc._id}`,
          { withCredentials: true }
        );

        if (res.data) {
          // console.log(res.data);
          setPendingCampaigns((cs) => cs.filter((c) => c._id !== acc._id));
          toast.success("Campaign rejected.");
          // console.log('Rejected campaign', acc._id);
        }
        setLoadingRejectCampaigns((prev) =>
          prev.filter((id) => id !== acc._id)
        );
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ", error);
        toast.error("Failed to reject campaign.");
      }
    };

    rejectCampaign();
  };

  //Handling Approval & Rejection of Account Deactivations
  const handleApproveDeactivation = (acc) => {
    const approveDeactivation = async () => {
      setLoadingApproveDeactivations((prev) => [...prev, acc._id]);
      try {
        const res = await axios.put(
          `${apiURL}/api/admin/account-deletion/approve/${acc._id}`,
          {},
          { withCredentials: true }
        );

        if (res.data) {
          // console.log(res.data);
          setPendingDeactivations((ds) => ds.filter((d) => d._id !== acc._id));
          toast.success("Account deactivation approved!");
        }
        setLoadingApproveDeactivations((prev) =>
          prev.filter((id) => id !== acc._id)
        );
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ", error);
        toast.error("Failed to approve deactivation.");
      }
    };

    approveDeactivation();
    // console.log('Approved deactivation', acc._id);
  };
  const handleRejectDeactivation = (acc) => {
    const rejectDeactivation = async () => {
      setLoadingRejectDeactivations((prev) => [...prev, acc._id]);
      try {
        const res = await axios.put(
          `${apiURL}/api/admin/account-deletion/reject/${acc._id}`,
          {},
          { withCredentials: true }
        );

        if (res.data) {
          // console.log(res.data);
          setPendingDeactivations((ds) => ds.filter((d) => d._id !== acc._id));
          toast.success("Account deactivation rejected.");
        }
        setLoadingRejectDeactivations((prev) =>
          prev.filter((id) => id !== acc._id)
        );
      } catch (error) {
        console.log("Error occured while fetching pending reuests : ", error);
        toast.error("Failed to reject deactivation.");
      }
    };

    rejectDeactivation();
    // console.log('Rejected deactivation', acc._id);
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="admin-page">
        <h1>Admin Dashboard</h1>

        <section className="admin-section">
          <h2>Pending Campaign Approvals</h2>
          <div className="admin-list">
            {pendingCampaigns.map((c) => (
              <div key={c._id} className="admin-card">
                <div
                  className="admin-card-details"
                  onClick={() =>
                    navigate(`/admin/preview/${c._id}`, {
                      state: { campaign: c },
                    })
                  }
                >
                  <p className="card-title">{c.fundraiseTitle}</p>
                  <p className="card-sub">By {c.userId?.fullName}</p>
                </div>
                <div className="card-actions">
                  <button
                    className="btn approve"
                    onClick={() => handleApproveCampaign(c)}
                    disabled={loadingApproveCampaigns.includes(c._id)}
                  >
                    {loadingApproveCampaigns.includes(c._id)
                      ? "Approving..."
                      : "Approve"}
                  </button>
                  <button
                    className="btn reject"
                    onClick={() => handleRejectCampaign(c)}
                    disabled={loadingRejectCampaigns.includes(c._id)}
                  >
                    {loadingRejectCampaigns.includes(c._id)
                      ? "Rejecting..."
                      : "Reject"}
                  </button>
                </div>
              </div>
            ))}
            {pendingCampaigns.length === 0 && (
              <p className="empty">No pending campaigns</p>
            )}
          </div>
        </section>

        <section className="admin-section">
          <h2>Pending Account Deactivations</h2>
          <div className="admin-list">
            {pendingDeactivations.map((d) => (
              <div key={d._id} className="admin-card">
                <div>
                  <p className="card-title">{d.fullName}</p>
                  <p className="card-sub">{d.email}</p>
                </div>
                <div className="card-actions">
                  <button
                    className="btn approve"
                    onClick={() => handleApproveDeactivation(d)}
                    disabled={loadingApproveDeactivations.includes(d._id)}
                  >
                    {loadingApproveDeactivations.includes(d._id)
                      ? "Approving..."
                      : "Approve"}
                  </button>

                  <button
                    className="btn reject"
                    onClick={() => handleRejectDeactivation(d)}
                    disabled={loadingRejectDeactivations.includes(d._id)}
                  >
                    {loadingRejectDeactivations.includes(d._id)
                      ? "Rejecting..."
                      : "Reject"}
                  </button>
                </div>
              </div>
            ))}
            {pendingDeactivations.length === 0 && (
              <p className="empty">No pending deactivations</p>
            )}
          </div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
