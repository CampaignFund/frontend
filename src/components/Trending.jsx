import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/Trending.css';
import axios from 'axios';
import { CampaignContext } from '../store/campaignStore';

const Trending=()=> {
  const [funds, setFunds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { apiURL } = useContext(CampaignContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${apiURL}/api/fund/trending`,
          { withCredentials: true }
        );
        setFunds(res.data.trendingFunds || []);
        // console.log(res.data);
      } catch (err) {
        console.error('Error fetching trending funds:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <p className="loading-screen">Loading trending fundraisers…</p>;
  }

  return (
    <section className="trending-section">
      <h2 className="trending-title">🔥 Trending Fundraisers</h2>
      <div className="trending-grid">
        {funds.map(f => {
          const percent = Math.min(
            100,
            Math.round((f.donationAmount / f.totalAmountRaised) * 100)
          );
          return (
            <Link
              to={`/donate/${f._id}`}
              key={f._id}
              className="trending-card"
            >
              <div
                className="card-image"
                style={{ backgroundImage: `url(${f.coverImage})` }}
              />
              <div className="card-body">
                <h3 className="card-title">{f.fundraiseTitle}</h3>
                <div className="progress-info">
                  <span>${f.donationAmount.toLocaleString()}</span>
                  <span>${f.totalAmountRaised.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Trending;