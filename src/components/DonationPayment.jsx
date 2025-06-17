import { useState } from 'react';
import '../css/DonationModal.css';

const DonateModal = ({ isOpen, onClose, onDonate, fund, isProcessing }) => {
  const amounts = [50,100,200,300,500,1000,2000,3000,5000,10000];
  const [selectedAmount, setSelectedAmount] = useState(amounts[0]);
  const [method, setMethod] = useState('bank');

  // const [card, setCard] = useState({ number: '', name: '', exp: '', cvv: '' });
  // const [upi, setUpi] = useState('');

  const [donor, setDonor] = useState({ fullName: '', email: '', phone: '' });
  const [proofImage, setProofImage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();

    if (method === 'bank') {
      formData.append('fundId', fund._id);
      formData.append('amount', selectedAmount);
      formData.append('fullName', donor.fullName);
      formData.append('email', donor.email);
      formData.append('contactNumber', donor.phone);
      formData.append('proofImage', proofImage);
    } 
    else if (method === 'card') {
      // paymentData = { amount: selectedAmount, method: 'card', ...card };
    } 
    else if (method === 'upi') {
      // paymentData = { amount: selectedAmount, method: 'upi', upi };
    }
    onDonate(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Select Amount</h2>

        <div className="amount-grid">
          {amounts.map(a => (
            <button
              key={a}
              type="button"
              className={`amount-btn ${selectedAmount === a ? 'selected' : ''}`}
              onClick={() => setSelectedAmount(a)}
            >Rs.{a}</button>
          ))}
        </div>

        <div className="method-tabs">
          {/* <button className={method === 'card' ? 'active' : ''} onClick={() => setMethod('card')}>Credit Card</button> */}
          {/* <button className={method === 'upi' ? 'active' : ''} onClick={() => setMethod('upi')}>UPI</button> */}
          <button className={method === 'bank' ? 'active' : ''} onClick={() => setMethod('bank')}>Bank Transfer</button>
        </div>

        <form onSubmit={handleSubmit}>
          {method === 'bank' && (
            <>
              <h3>Fundraiser Bank Details</h3>
              <label>Account Holder Name
                <input className='readonly-fields' type="text" value={fund.accountHolderName} readOnly />
              </label>
              <label>Account Number
                <input className='readonly-fields' type="text" value={fund.accountNumber} readOnly />
              </label>
              <label>Bank Name
                <input className='readonly-fields' type="text" value={fund.bankName} readOnly />
              </label>
              <label>IFSC / Bank Code
                <input className='readonly-fields' type="text" value={fund.ifscCode} readOnly />
              </label>

              <h3>Your Details</h3>
              <label>Full Name
                <input
                  type="text"
                  name="fullName"
                  value={donor.fullName}
                  onChange={e => setDonor(d => ({ ...d, fullName: e.target.value }))}
                  required
                />
              </label>
              <label>Email
                <input
                  type="email"
                  name="email"
                  value={donor.email}
                  onChange={e => setDonor(d => ({ ...d, email: e.target.value }))}
                  required
                />
              </label>
              <label>Phone Number
                <input
                  type="tel"
                  name="phone"
                  value={donor.phone}
                  onChange={e => setDonor(d => ({ ...d, phone: e.target.value }))}
                  required
                />
              </label>
              <label>Payment Proof (Screenshot)
                <input
                  type="file"
                  name="proofImage"
                  accept="image/*"
                  onChange={e => setProofImage(e.target.files[0])}
                  required
                />
              </label>
            </>
          )}

          {/* {method === 'card' && (
            <> ...Credit Card fields... </>
          )} */}
          {/* {method === 'upi' && (
            <> ...UPI fields... </>
          )} */}

          <button type="submit" className="donate-confirm" disabled={isProcessing}>{isProcessing?'Processing...':'Submit Donation'}</button>
        </form>
      </div>
    </div>
  );
};

export default DonateModal;
