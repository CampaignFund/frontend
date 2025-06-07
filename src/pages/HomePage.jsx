import Divider from "../components/Divider";
import Footer from "../components/Footer";
import HomeContainer from "../components/HomeContainer";
import Features from "../components/HomeFeatures";
import Navbar from "../components/Navbar";
import '../css/Home.css'

const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <HomeContainer></HomeContainer>
            <Divider></Divider>
            <Features></Features>
            <Footer></Footer>
        </>
    );
}

export default Home;