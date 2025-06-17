import { Link } from 'react-router-dom';
import '../css/HomeContainer.css';

const images = [
  '/CFund_1.jpg',
  '/CFund_2.jpg',
  '/CFund_3.jpg',
];

const HomeContainer = () => {
  return (
    <section className="homeContainer">
      <div className="hero">
        <h1>Welcome to Campaign Fund</h1>
        <p>Empowering change—one campaign at a time.</p>
        <div className="button-group">
          <Link to="/campaign"><button className="cta-button">Start a Campaign</button></Link>
          <Link to="/fundraisers"><button className="cta-button donate">Donate</button></Link>
        </div>
      </div>
      <div className="gallery">
        {images.map((src, i) => (
          <div key={i} className="gallery-item">
            <img src={src} alt={`Illustration ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeContainer;
