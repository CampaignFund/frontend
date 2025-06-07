import { useState } from 'react';
import '../css/Donate.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Donate = () => {
    const goal = 5000;
    const [collected, setCollected] = useState(2350);

    const handleDonate = () => {
        const amount = parseInt(prompt('Enter donation amount:'), 10);
        if (!isNaN(amount) && amount > 0) {
            setCollected(prev => Math.min(prev + amount, goal));
        }
    };

    const handleShare = ()=>{
        console.log("Sharing...");
    }

    const percent = Math.min((collected / goal) * 100, 100);

    return (<>
        <Navbar></Navbar>
        <div className="donate-page">
            <div className="donate-left">
                <img
                    src="/CFund_4.jpg"
                    alt="Campaign cover"
                    className="donate-cover"
                />
                <h1 className="donate-title">Help Build a School</h1>
                <p className="donate-story">
                    Your contribution will help provide educational resources and build a safe,
                    nurturing environment for children in underprivileged communities. Every dollar
                    brings us closer to opening doors of opportunity.
                </p>
            </div>
            <div className="donate-right">
                <div className="progress-info">
                    <span>${collected.toLocaleString()}</span>
                    <span>raised of ${goal.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <button className="donate-button" onClick={handleDonate}>
                    Donate Now
                </button>
                <button className="share-button" onClick={handleShare}>
                    Share Now
                </button>
            </div>
        </div>
        <Footer></Footer>
    </>);
}

export default Donate;