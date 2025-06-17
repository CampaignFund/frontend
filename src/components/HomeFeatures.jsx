import React from 'react';
import { FaLeaf, FaHandsHelping, FaBullhorn, FaUsers } from 'react-icons/fa';
import '../css/HomeFeatures.css';

const featureList = [
  {
    icon: <FaLeaf />,
    title: 'Verified Campaigns',
    desc: 'All campaigns reviewed for authenticity.',
  },
  {
    icon: <FaHandsHelping />,
    title: 'Easy Setup',
    desc: 'Launch your campaign in minutes.',
  },
  {
    icon: <FaBullhorn />,
    title: 'Progress Tracking',
    desc: 'Monitor donations and engagement in real-time.',
  },
  {
    icon: <FaUsers />,
    title: 'Secure Payments',
    desc: 'Safe transactions with local payment methods.',
  },
];

const Features = ()=>{
  return (
    <section className="features">
      <h2>Our Features</h2>
      <div className="feature-grid">
        {featureList.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;