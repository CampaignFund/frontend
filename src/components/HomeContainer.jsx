import { Link } from 'react-router-dom';
import '../css/HomeContainer.css';

const images = [
  '/Home_1.jpg',
  '/Home_2.jpg',
  '/Home_3.jpg',
];

const HomeContainer = () => {
  return (
    <section className="homeContainer">
      <div className="hero">
        <h1>Welcome to Zaroorat</h1>
        <p style={{textAlign:'center'}}>Introducing Pakistan's first crowdfunding platform - Connecting hearts to causes that matter.</p>
        <div className="button-group">
          <Link to="/campaign"><button className="cta-button">Start your Zaroorat</button></Link>
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
