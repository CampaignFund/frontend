import { Link } from 'react-router-dom';
import '../css/Trending.css';

const trending = [
  {
    id: 1,
    title: 'Solar Power for Village School',
    image: 'https://source.unsplash.com/300x200/?solar,panel',
    raised: 4200,
    goal: 5000
  },
  {
    id: 2,
    title: 'Medical Camp in Rural Area',
    image: 'https://source.unsplash.com/300x200/?medical,clinic',
    raised: 3200,
    goal: 4000
  },
  {
    id: 3,
    title: 'Clean Water Initiative',
    image: 'https://source.unsplash.com/300x200/?water,clean',
    raised: 5500,
    goal: 6000
  },
  {
    id: 4,
    title: 'Books for Underprivileged Kids',
    image: 'https://source.unsplash.com/300x200/?books,children',
    raised: 1800,
    goal: 3000
  }
];

const TrendingFundraisers=()=> {
  return (
    <section className="trending-section">
      <h2 className="trending-title">🔥 Trending Fundraisers</h2>
      <div className="trending-grid">
        {trending.map(f => {
          const percent = Math.min(100, Math.round((f.raised / f.goal) * 100));
          return (
            <Link to={`/donate/${f.id}`} key={f.id} className="trending-card">
              <div
                className="card-image"
                style={{ backgroundImage: `url(${f.image})` }}
              />
              <div className="card-body">
                <h3 className="card-title">{f.title}</h3>
                <div className="progress-info">
                  <span>${f.raised.toLocaleString()}</span>
                  <span>${f.goal.toLocaleString()}</span>
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

export default TrendingFundraisers; 