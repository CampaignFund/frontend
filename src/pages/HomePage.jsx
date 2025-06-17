import { useContext, useEffect } from "react";
import Divider from "../components/Divider";
import Footer from "../components/Footer";
import HomeContainer from "../components/HomeContainer";
import Features from "../components/HomeFeatures";
import Navbar from "../components/Navbar";
import '../css/Home.css'
import { CampaignContext } from "../store/campaignStore";
import { useLocation } from "react-router-dom";
import Trending from "../components/Trending";
import CookieConsent from "../components/CookieConsent";

const Home = () => {
    const { setUser } = useContext(CampaignContext);
    const location = useLocation()
    const params = new window.URLSearchParams(location.search);
    const googleUser = {
        fullName: params.get('name'),
        email: params.get('email'),
        role: params.get('role')
    }

    useEffect(() => {
        if (googleUser.fullName && googleUser.email) {
            setUser(googleUser);
            localStorage.setItem('user', JSON.stringify(googleUser));
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [])
    return (
        <>
            <Navbar></Navbar>
            <CookieConsent></CookieConsent>
            <HomeContainer></HomeContainer>
            <Divider></Divider>
            <Trending />
            <Features></Features>
            <Footer></Footer>
        </>
    );
}

export default Home;