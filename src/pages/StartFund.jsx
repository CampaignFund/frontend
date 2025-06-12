// src/pages/StartFund.jsx
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import '../css/StartFund.css';
import axios from 'axios';
import { CampaignContext } from '../store/campaignStore';

const CATEGORY_OPTIONS = [
  'animal',
  'business',
  'community',
  'competition',
  'creative',
  'education',
  'emergencies',
  'environment',
  'events',
  'faith',
  'family',
  'funerals_memorials',
  'medical',
  'monthly_bills',
  'newly_weds',
  'other',
  'sports',
  'travel',
  'ukraine_relief',
  'volunteer',
  'wishes',
];

const formatLabel = (key) =>
  key
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

export default function StartFund() {
  const { apiURL } = useContext(CampaignContext);
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    country: '',
    postcode: '',
    fundraiseTitle: '',
    fundCategory: '',
    totalAmountRaised: '',
    fundraiseStory: '',
    coverImage: null,
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: ''
  });

  const countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia'];

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((f) => ({ ...f, [name]: files ? files[0] : value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    axios
      .post(`${apiURL}/api/fund/create-fundraise`, form, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        setIsSending(false);
        navigate('/');
      })
      .catch((err) => {
        console.error('Error creating fundraiser:', err);
        setIsSending(false);
      });
  };

  return (
    <div className="start-fund-container">
      <div className="start-fund-page">
        <Link to="/" className="home-icon"><FiHome /></Link>
        <h1>Start a Fundraising Campaign</h1>

        <div className="stepper">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className={`step ${step >= n ? 'active' : ''}`}>
              <div className="circle">{n}</div>
              {n < 5 && <div className="line" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="step-content">
              <label>
                Country
                <div className="custom-select">
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select country</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </label>
              <label>
                ZIP / Postal Code
                <input
                  name="postcode"
                  value={form.postcode}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <label>
                Campaign Title
                <input
                  name="fundraiseTitle"
                  value={form.fundraiseTitle}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Category
                <div className="custom-select">
                  <select
                    name="fundCategory"
                    value={form.fundCategory}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    {CATEGORY_OPTIONS.map((key) => (
                      <option key={key} value={key}>
                        {formatLabel(key)}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              <label>
                Goal Amount ($)
                <input
                  name="totalAmountRaised"
                  type="number"
                  value={form.totalAmountRaised}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <label>
                Story Description
                <textarea
                  name="fundraiseStory"
                  value={form.fundraiseStory}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Cover Image
                <input
                  name="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          )}

          {step === 4 && (
            <div className="step-content">
              <label>
                Account Holder Name
                <input
                  name="accountHolderName"
                  value={form.accountHolderName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Account Number
                <input
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                />
              </label>
              <label>
                Bank Name
                <input
                  name="bankName"
                  value={form.bankName}
                  onChange={handleChange}
                />
              </label>
              <label>
                IFSC Code
                <input
                  name="ifscCode"
                  value={form.ifscCode}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}

          {step === 5 && (
            <div className="step-content review">
              <h2>Review Your Campaign</h2>
              <p><strong>Country:</strong> {form.country}</p>
              <p><strong>ZIP:</strong> {form.postcode}</p>
              <p><strong>Title:</strong> {form.fundraiseTitle}</p>
              <p><strong>Category:</strong> {formatLabel(form.fundCategory)}</p>
              <p><strong>Goal:</strong> ${form.totalAmountRaised}</p>
              <p><strong>Story:</strong> {form.fundraiseStory}</p>
              {form.coverImage && (
                <img
                  src={URL.createObjectURL(form.coverImage)}
                  alt="Preview"
                  className="preview-img"
                />
              )}
              <h3>Payout To:</h3>
              <p><strong>Name:</strong> {form.accountHolderName}</p>
              <p><strong>Number:</strong> {form.accountNumber}</p>
              <p><strong>Bank:</strong> {form.bankName}</p>
              <p><strong>IFSC:</strong> {form.ifscCode}</p>
            </div>
          )}

          <div className="buttons">
            {step > 1 && (
              <button type="button" className="btn back" onClick={back}>
                Back
              </button>
            )}
            {step < 5 ? (
              <button type="button" className="btn next" onClick={next}>
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn submit"
                disabled={isSending}
              >
                {isSending ? 'Sending…' : 'Submit'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
