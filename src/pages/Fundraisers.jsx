import { Link } from 'react-router-dom';
import '../css/Fundraisers.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fundraisers = [
  { id: 1, title: 'Build a School in Bihar', image: 'https://source.unsplash.com/400x300/?school,india' },
  { id: 2, title: 'Medical Aid for Rural Clinics', image: 'https://source.unsplash.com/400x300/?medical,aid' },
  { id: 3, title: 'Clean Water for Villages', image: 'https://source.unsplash.com/400x300/?clean,water' },
  { id: 4, title: 'Animal Rescue & Shelter', image: 'https://source.unsplash.com/400x300/?animal,shelter' },
  { id: 5, title: 'Reforestation Project', image: 'https://source.unsplash.com/400x300/?forest,planting' },
  { id: 6, title: 'Community Sports Initiative', image: 'https://source.unsplash.com/400x300/?community,sports' }
];

const Fundraisers=()=> {
  return (<>
  <Navbar></Navbar>
    <div className="fundraisers-page">
      <h1>Active Fundraisers</h1>
      <div className="fundraiser-grid">
        {fundraisers.map(f => (
          <Link to={`/donate/${f.id}`} key={f.id} className="fundraiser-card">
            <div
              className="card-image"
              style={{ backgroundImage: `url(${f.image})` }}
            />
            <div className="card-title">{f.title}</div>
          </Link>
        ))}
      </div>
    </div>
    <Footer></Footer>
  </>);
}

export default Fundraisers;