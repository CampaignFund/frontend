import { Link } from 'react-router-dom';
import '../css/Discover.css';
import {
  MdOutlineHealthAndSafety,
  MdOutlineCastForEducation,
  MdOutlineSafetyCheck,
} from 'react-icons/md';
import { AiOutlineSafety, AiOutlineEnvironment, AiOutlineAppstore } from 'react-icons/ai';
import { PiDogFill } from 'react-icons/pi';
import { RiCommunityLine } from 'react-icons/ri';
import { GiTrophyCup, GiTombstone, GiCakeSlice } from 'react-icons/gi';
import {
  FaBriefcase,
  FaPaintBrush,
  FaUsers,
  FaMoneyBillWave,
  FaRing,
  FaFootballBall,
  FaPlane,
  FaHandsHelping,
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CATEGORY_OPTIONS = [
  'animal',
  'business',
  'community',
  'competition',
  'creative',
  'education',
  'emergencies',
  'environment',
  'events',
  'faith',
  'family',
  'funerals_memorials',
  'medical',
  'monthly_bills',
  'newly_weds',
  'other',
  'sports',
  'travel',
  'volunteer',
  'wishes',
];

const iconMap = {
  animal: <PiDogFill />,
  business: <FaBriefcase />,
  community: <RiCommunityLine />,
  competition: <GiTrophyCup />,
  creative: <FaPaintBrush />,
  education: <MdOutlineCastForEducation />,
  emergencies: <MdOutlineSafetyCheck />,
  environment: <AiOutlineEnvironment />,
  events: <AiOutlineAppstore />,
  faith: <AiOutlineSafety />,
  family: <FaUsers />,
  funerals_memorials: <GiTombstone />,
  medical: <MdOutlineHealthAndSafety />,
  monthly_bills: <FaMoneyBillWave />,
  newly_weds: <FaRing />,
  other: <AiOutlineAppstore />,
  sports: <FaFootballBall />,
  travel: <FaPlane />,
  volunteer: <FaHandsHelping />,
  wishes: <GiCakeSlice />,
};

const labelMap = {
  animal: 'Animal',
  business: 'Business',
  community: 'Community',
  competition: 'Competition',
  creative: 'Creative',
  education: 'Education',
  emergencies: 'Emergencies',
  environment: 'Environment',
  events: 'Events',
  faith: 'Faith',
  family: 'Family',
  funerals_memorials: 'Funerals & Memorials',
  medical: 'Medical',
  monthly_bills: 'Monthly Bills',
  newly_weds: 'Newly Weds',
  other: 'Other',
  sports: 'Sports',
  travel: 'Travel',
  ukraine_relief: 'Ukraine Relief',
  volunteer: 'Volunteer',
  wishes: 'Wishes',
};

export default function Discover() {
  return (
    <>
      <Navbar />
      <main className="discover-page">
        <h1>Discover Campaigns by Category</h1>
        <div className="discover-content">
          <div className="content-left">
            <Link to="/campaign" className="start-campaign">
              Start Campaign
            </Link>
            <div className="categories-grid">
              {CATEGORY_OPTIONS.map((key) => (
                <Link key={key} to={`/fundraisers/${key}`}>
                  <div className="category-card">
                    <div className="icon">{iconMap[key]}</div>
                    <span>{labelMap[key]}</span>
                  </div>
                </Link>
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
