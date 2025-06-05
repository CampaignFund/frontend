import Footer from "../components/Footer";
import HomeContainer from "../components/HomeContainer";
import Navbar from "../components/Navbar";
import '../css/Home.css'

const Home = () => {
    return (
        <>
            <Navbar></Navbar>
            <HomeContainer></HomeContainer>
            <Footer></Footer>
        </>
    );
}

export default Home;