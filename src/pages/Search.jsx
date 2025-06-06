import { CiSearch} from "react-icons/ci";
import '../css/Search.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Search = ()=>{
    return(<>
        <Navbar></Navbar>
        <div className="search-body">
            <div className="search-title">
                <h2>Find the campaign for donation</h2>
                <p>This is where you feel more connected with people all around the world</p>
            </div>
            <div className="search-container">
                <CiSearch className="search-icon"/>
                <input type="text" name="search" placeholder="Search the fundraisers or nonprofit"/>
            </div>
            <div className="suggestion-container">

            </div>
        </div>
        <Footer></Footer>
    </>);
};

export default Search;