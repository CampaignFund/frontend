import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../css/Partners.css';

const partners = [
  { name: 'CharityOrg', logoUrl: '/assets/logos/charityorg.png', link: '#' },
  { name: 'HealthAid', logoUrl: '/assets/logos/healthaid.png', link: '#' },
  { name: 'EduFuture', logoUrl: '/assets/logos/edufuture.png', link: '#' },
  { name: 'GreenWorld', logoUrl: '/assets/logos/greenworld.png', link: '#' },
  { name: 'TechForGood', logoUrl: '/assets/logos/techforgood.png', link: '#' },
  { name: 'Food4All', logoUrl: '/assets/logos/food4all.png', link: '#' }
];

const Partners=()=> {
  return (<>
    <Navbar></Navbar>
    <section className="partners-section">
      <div className="partners-content">
        <h2 className="partners-title">Our Partners</h2>
        <p className="partners-text">
          We collaborate with reputable organizations to maximize our impact. Our partners share 
          our vision of creating positive change in communities around the world.
        </p>
        <div className="partners-grid">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.link}
              className="partner-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={partner.logoUrl}
                alt={partner.name + ' logo'}
                className="partner-logo"
              />
              <span className="partner-name">{partner.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
    <Footer></Footer>
  </>);
}

export default Partners;