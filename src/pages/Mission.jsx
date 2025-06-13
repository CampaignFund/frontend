import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../css/Mission.css';

const Mission=()=> {
  return (<>
    <Navbar></Navbar>
    <section className="mission-section">
      <div className="mission-content">
        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-text">
          At <span className="highlight">FundRise</span>, we believe in the power of community
          to change lives. Our mission is to connect generous donors with causes they care
          about, and to make every donation transparent, impactful, and uplifting.
        </p>
        <ul className="mission-list">
          <li>
            <strong>Empowerment:</strong> Enable fundraisers to tell their stories and
            reach supporters worldwide.
          </li>
          <li>
            <strong>Transparency:</strong> Provide clear progress tracking and share
            updates at every step.
          </li>
          <li>
            <strong>Integrity:</strong> Ensure every penny goes where it’s intended,
            with rigorous verification and security.
          </li>
          <li>
            <strong>Community:</strong> Foster a caring network of donors, volunteers,
            and organizers.
          </li>
        </ul>
        <div className="mission-cta">
          <Link to={'/campaign'}><button className="primary-button">Start a Fundraiser</button></Link>
          <Link to={'/fundraisers'}><button className="secondary-button">Browse Campaigns</button></Link>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </>);
}

export default Mission;