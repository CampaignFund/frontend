import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../css/Mission.css';

const Mission = () => {
  return (<>
    <Navbar></Navbar>
    <section className="mission-section">
      <div className="mission-content">
        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-text">
          At <span className="highlight">Zaroorat</span>, we believe in the Pakistani spirit 
          of helping those in need. Our mission is to connect compassionate donors across 
          Pakistan with causes that matter, making every contribution transparent, meaningful, 
          and impactful for our communities.
        </p>
        <ul className="mission-list">
          <li>
            <strong>Empowerment:</strong> Enable Pakistani fundraisers to share their stories and reach supporters across all provinces and overseas Pakistani communities.
          </li>
          <li>
            <strong>Transparency:</strong> Provide clear progress tracking and regular updates so donors know exactly how their contributions are making a difference.
          </li>
          <li>
            <strong>Trust:</strong> Ensure every rupee reaches its intended purpose through rigorous campaign verification and secure payment systems.
          </li>
          <li>
            <strong>Community:</strong> Build a caring network that reflects Pakistani values of mutual support, where neighbors help neighbors and communities uplift each other.
          </li>
        </ul>
        <div className="mission-cta">
          <Link to={'/campaign'}><button className="primary-button">Start Your Zaroorat</button></Link>
          <Link to={'/fundraisers'}><button className="secondary-button">Explore Needs</button></Link>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </>);
}

export default Mission;