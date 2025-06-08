import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import '../css/StartFund.css';

export default function StartFund() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    country: '',
    zip: '',
    title: '',
    category: '',
    goal: '',
    story: '',
    image: null,
    accountName: '',
    accountNumber: '',
    bankName: '',
    ifsc: ''
  });

  const next = () => setStep(s => Math.min(5, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));
  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(form);
  };

  const countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia'];

  return (
    <div className="start-fund-container">
      <div className="start-fund-page">
        <Link to="/" className="home-icon"><FiHome /></Link>
        <h1>Start a Fundraising Campaign</h1>
        <div className="stepper">
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} className={`step ${step >= n ? "active" : ""}`}>
              <div className="circle">{n}</div>
              {n < 5 && <div className="line" />}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="step-content">
              <label>Country
                <div className="custom-select">
                  <select name="country" value={form.country} onChange={handleChange} required>
                    <option value="">Select country</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </label>
              <label>ZIP / Postal Code
                <input name="zip" value={form.zip} onChange={handleChange} required />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <label>Campaign Title
                <input name="title" value={form.title} onChange={handleChange} required />
              </label>
              <label>Category
                <input name="category" value={form.category} onChange={handleChange} required />
              </label>
              <label>Goal Amount ($)
                <input name="goal" type="number" value={form.goal} onChange={handleChange} required />
              </label>
            </div>
          )}
          {step === 3 && (
            <div className="step-content">
              <label>Story Description
                <textarea name="story" value={form.story} onChange={handleChange} required />
              </label>
              <label>Cover Image
                <input name="image" type="file" accept="image/*" onChange={handleChange} required />
              </label>
            </div>
          )}
          {step === 4 && (
            <div className="step-content">
              <label>Account Holder Name
                <input name="accountName" value={form.accountName} onChange={handleChange} required />
              </label>
              <label>Account Number
                <input name="accountNumber" value={form.accountNumber} onChange={handleChange} required />
              </label>
              <label>Bank Name
                <input name="bankName" value={form.bankName} onChange={handleChange} required />
              </label>
              <label>IFSC Code
                <input name="ifsc" value={form.ifsc} onChange={handleChange} required />
              </label>
            </div>
          )}
          {step === 5 && (
            <div className="step-content review">
              <h2>Review Your Campaign</h2>
              <p><strong>Country:</strong> {form.country}</p>
              <p><strong>ZIP:</strong> {form.zip}</p>
              <p><strong>Title:</strong> {form.title}</p>
              <p><strong>Category:</strong> {form.category}</p>
              <p><strong>Goal:</strong> ${form.goal}</p>
              <p><strong>Story:</strong> {form.story}</p>
              {form.image && <img src={URL.createObjectURL(form.image)} alt="preview" />}
              <h3>Payout To:</h3>
              <p><strong>Name:</strong> {form.accountName}</p>
              <p><strong>Account #:</strong> {form.accountNumber}</p>
              <p><strong>Bank:</strong> {form.bankName}</p>
              <p><strong>IFSC:</strong> {form.ifsc}</p>
            </div>
          )}
          <div className="buttons">
            {step > 1 && <button type="button" className="btn back" onClick={back}>Back</button>}
            {step < 5
              ? <button type="button" className="btn next" onClick={next}>Next</button>
              : <button type="submit" className="btn submit">Submit</button>
            }
          </div>
        </form>
      </div>
    </div>
  );
}
