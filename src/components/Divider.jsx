import React from 'react';
import { FiZap, FiClock, FiUsers } from 'react-icons/fi';
import '../css/Divider.css';

const stats = [
  { icon: <FiZap />, text: 'No fee to start fundraising' },
  { icon: <FiClock />, text: '1 donation made every second' },
  { icon: <FiUsers />, text: '8K+ fundraisers started daily' },
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