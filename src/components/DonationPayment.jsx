import { useState } from 'react';
import '../css/DonationModal.css';

const DonateModal=({ isOpen, onClose, onDonate })=>{
  const amounts = [5,10,50,100,200,500,1000];
  const [selectedAmount, setSelectedAmount] = useState(amounts[0]);
  const [method, setMethod] = useState('card');
  const [card, setCard] = useState({ number:'', name:'', exp:'', cvv:'' });
  const [upi, setUpi] = useState('');

  if (!isOpen) return null;

  const handleSubmit = e => {
    e.preventDefault();
    const payment = method==='card' ? { ...card } : { upi };
    onDonate({amount:selectedAmount});
    
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e=>e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Select Amount</h2>
        <div className="amount-grid">
          {amounts.map(a=>(
            <button
              key={a}
              type="button"
              className={`amount-btn ${selectedAmount===a?'selected':''}`}
              onClick={()=>setSelectedAmount(a)}
            >${a}</button>
          ))}
        </div>
        <div className="method-tabs">
          <button
            className={method==='card'?'active':''}
            onClick={()=>setMethod('card')}
          >Credit Card</button>
          <button
            className={method==='upi'?'active':''}
            onClick={()=>setMethod('upi')}
          >UPI</button>
        </div>
        <form onSubmit={handleSubmit}>
          {method==='card' && (
            <>
              <label>Card Number
                <input
                  type="text" name="number" value={card.number}
                  onChange={e=>setCard(c=>({...c,number:e.target.value}))}
                  required maxLength="19"
                />
              </label>
              <label>Name on Card
                <input
                  type="text" name="name" value={card.name}
                  onChange={e=>setCard(c=>({...c,name:e.target.value}))}
                  required
                />
              </label>
              <div className="card-row">
                <label>Expiry
                  <input
                    type="text" name="exp" value={card.exp}
                    onChange={e=>setCard(c=>({...c,exp:e.target.value}))}
                    placeholder="MM/YY" required maxLength="5"
                  />
                </label>
                <label>CVV
                  <input
                    type="password" name="cvv" value={card.cvv}
                    onChange={e=>setCard(c=>({...c,cvv:e.target.value}))}
                    required maxLength="4"
                  />
                </label>
              </div>
            </>
          )}
          {method==='upi' && (
            <label>UPI ID
              <input
                type="text" name="upi" value={upi}
                onChange={e=>setUpi(e.target.value)}
                placeholder="example@bank" required
              />
            </label>
          )}
          <button type="submit" className="donate-confirm">Pay ${selectedAmount}</button>
        </form>
      </div>
    </div>
  );
}

export default DonateModal;