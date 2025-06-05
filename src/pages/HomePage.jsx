import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h1>Welcome to the Home Page</h1>
            <p>This is the main page of our application.</p>
            <Footer></Footer>
        </div>
    );
}

export default Home;