import React from 'react';
import { FiZap, FiClock, FiUsers } from 'react-icons/fi';
import '../css/Divider.css';

const stats = [
  { icon: <FiZap />, text: 'Connecting donors with local causes ' },
  { icon: <FiClock />, text: 'Campaigns from Karachi to Lahore to Peshawar' },
  { icon: <FiUsers />, text: 'Free to start, easy to share' },
];

const Divider=()=>{
  return (
    <section className="stats-divider">
      {stats.map((s, i) => (
        <React.Fragment key={i}>
          <div className="stat">
            <span className="stat-icon">{s.icon}</span>
            <span className="stat-text">{s.text}</span>
          </div>
          {i < stats.length - 1 && <div className="separator" />}
        </React.Fragment>
      ))}
    </section>
  );
}

export default Divider;