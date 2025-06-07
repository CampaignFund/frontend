import React from 'react';
import { FaLeaf, FaHandsHelping, FaBullhorn, FaUsers } from 'react-icons/fa';
import '../css/HomeFeatures.css';

const featureList = [
  {
    icon: <FaLeaf />,
    title: 'Eco-Friendly',
    desc: 'All our campaigns promote sustainable causes.',
  },
  {
    icon: <FaHandsHelping />,
    title: 'Community Driven',
    desc: 'Built with and for local communities.',
  },
  {
    icon: <FaBullhorn />,
    title: 'Wide Reach',
    desc: 'Amplify your message to thousands.',
  },
  {
    icon: <FaUsers />,
    title: 'Easy Collaboration',
    desc: 'Invite team members in one click.',
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