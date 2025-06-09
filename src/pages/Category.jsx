import { Link } from 'react-router-dom';
import '../css/Discover.css';
import { MdOutlineHealthAndSafety, MdOutlineCastForEducation } from "react-icons/md";
import { AiOutlineSafety, AiOutlineEnvironment } from "react-icons/ai";
import { PiDogFill } from "react-icons/pi";
import { RiCommunityLine } from "react-icons/ri";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = [
  { name: 'Education', icon: <MdOutlineCastForEducation /> },
  { name: 'Health', icon: <MdOutlineHealthAndSafety /> },
  { name: 'Disaster Relief', icon: <AiOutlineSafety /> },
  { name: 'Animal Welfare', icon: <PiDogFill /> },
  { name: 'Environment', icon: <AiOutlineEnvironment /> },
  { name: 'Community', icon: <RiCommunityLine /> },
];

export default function Discover() {
  return (
    <>
      <Navbar />
      <main className="discover-page">
        <h1>Discover Campaigns by Category</h1>
        <div className="discover-content">
          <div className="content-left">
            <Link to="/campaign" className="start-campaign">Start Campaign</Link>
            <div className="categories-grid">
              {categories.map(cat => (
                <Link to={`/fundraisers/${cat.name}`}><div key={cat.name} className="category-card">
                  <div className="icon">{cat.icon}</div>
                  <span>{cat.name}</span>
                </div></Link>
              ))}
            </div>
          </div>
          <div className="content-right">
            <img src="/CFund_5.jpg" alt="Donation" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
