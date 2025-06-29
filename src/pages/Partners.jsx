import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../css/Partners.css';

const Partners = () => {
  return (
    <>
      <Navbar />
      <section className="partners-section">
        <div className="partners-content">
          <h2 className="partners-title">How Payments Work on Zaroorat</h2>
          <p className="partners-text">
            Thank you for choosing to support a campaign on Zaroorat — Pakistan’s first crowdfunding platform!
          </p>
          <p className="partners-text">
            To ensure a secure and transparent process, please follow the steps below when making a payment:
          </p>

          <h3 className="partners-subtitle">Step-by-Step Payment Instructions:</h3>
          <ol className="partners-list">
            <li>
              <strong>Select an Amount:</strong> Choose a predefined option or enter a custom amount.
            </li>
            <li>
              <strong>Transfer the Amount Manually:</strong> Our bank account details will be shown. Use your banking app, ATM, or online banking to transfer the amount.
            </li>
            <li>
              <strong>Submit Payment Proof:</strong><br />
              - Enter your email address and phone number.<br />
              - Upload a screenshot or photo of your transaction slip.
            </li>
          </ol>

          <h3 className="partners-subtitle"> Verification & Processing:</h3>
          <p className="partners-text">
            - We verify the payment manually.<br />
            - Admin (Zaroorat team) is notified.<br />
            - After confirmation, the funds are disbursed to the campaign owner.
          </p>

          <h3 className="partners-subtitle"> Platform Fee</h3>
          <p className="partners-text">
            Zaroorat charges a 5% platform fee on each donation. This helps us improve and maintain the platform.
          </p>

          <p className="partners-text">
            If you have any questions or face any issues during the payment process, feel free to contact us anytime.
          </p>

          <p className="partners-thankyou">
            Thank you for being a part of the change.<br />
            <strong>Zaroorat – Helping Pakistan, One Campaign at a Time. </strong>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Partners;
