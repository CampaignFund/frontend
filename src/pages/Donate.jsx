import { useContext, useEffect, useState } from 'react';
import '../css/Donate.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DonateModal from '../components/DonationPayment';
import axios from 'axios';
import { CampaignContext } from '../store/campaignStore';
import { useParams } from 'react-router-dom';

const Donate = () => {
    const goal = 5000;
    const [collected, setCollected] = useState(2350);
    const [isModalOpen, setModalOpen] = useState(false);
    const [fund, setFund] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { apiURL } = useContext(CampaignContext)

    const params = useParams();
    const fundId = new window.URLSearchParams(params).get('id');


    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${apiURL}/api/fund/fund-list/${fundId}`);
                if (res.data) {
                    console.log(res.data);
                    setFund(res.data.fund);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log("Some error occured : ", error);
            }
        })();
    }, []);

    const handleDonate = ({ amount }) => {
        if (!isNaN(amount) && amount > 0) {
            setCollected(prev => Math.min(prev + amount, goal));
        }
    };

    const handleOpenPayment = () => setModalOpen(true);

    const handleClosePayment = () => setModalOpen(false);

    const handleShare = () => {
        console.log("Sharing...");
    }

    const percent = Math.min((fund?.donationAmount / fund?.totalAmountRaised) * 100, 100);

    return (<>
        <Navbar></Navbar>
        {isLoading ? <><p className='loading-screen'>Loading...</p></> : <><div className="donate-page">
            <div className="donate-left">
                <img
                    src={fund?.coverImage}
                    alt="Campaign cover"
                    className="donate-cover"
                />
                <h1 className="donate-title">{fund?.fundraiseTitle}</h1>
                <p className="donate-story">
                    {fund?.fundraiseStory}
                </p>
            </div>
            <div className="donate-right">
                <div className="progress-info">
                    <span>${fund?.donationAmount.toLocaleString()}</span>
                    <span>raised of ${fund?.totalAmountRaised.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <button className="donate-button" onClick={handleOpenPayment}>
                    Donate Now
                </button>
                <button className="share-button" onClick={handleShare}>
                    Share Now
                </button>
            </div>
        </div></>}
        <DonateModal isOpen={isModalOpen} onClose={handleClosePayment} onDonate={handleDonate}></DonateModal>
        <Footer></Footer>
    </>);
}

export default Donate;