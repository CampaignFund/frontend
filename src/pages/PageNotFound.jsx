import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import '../css/PageNotFound.css'

const PageNotFound = () => {
    return (<>
        <Navbar></Navbar>
        <div className="container">
            <div className="message">
                <h2>Error 404</h2>
                <h4>Page Not Found</h4>
            </div>
        </div>
        <Footer></Footer>
    </>);
}

export default PageNotFound;