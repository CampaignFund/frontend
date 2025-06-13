import { CiSearch } from "react-icons/ci";
import '../css/Search.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { CampaignContext } from "../store/campaignStore";
import axios from "axios";
import { Link } from "react-router-dom";
import Trending from "../components/Trending";

const Search = () => {
    const [funds, setFunds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;
    const { apiURL } = useContext(CampaignContext);

    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${apiURL}/api/fund/fund-list?search=${query}`);
                if (res.data?.funds) {
                    setFunds(res.data.funds);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching fundraisers: ', error);
            }
        })();
    }, [query]);

    const totalPages = Math.ceil(funds.length / perPage);
    const startIdx = (currentPage - 1) * perPage;
    const currentFunds = funds.slice(startIdx, startIdx + perPage);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (<>
        <Navbar></Navbar>
        <div className="search-body">
            <div className="search-title">
                <h2>Find the campaign for donation</h2>
                <p>This is where you feel more connected with people all around the world</p>
            </div>
            <div className="search-container">
                <CiSearch className="search-icon" />
                <input type="text" name="search" placeholder="Search the fundraisers or nonprofit" onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className={`suggestion-container ${query.length === 0 && 'disabled'}`}>
                {isLoading ? <><p className='loading-screen'>Loading...</p></> : <><div className="fundraisers-page">
                    <h1>Searched by "{query}"</h1>

                    {funds.length === 0 ? (
                        <p className="no-funds">No fundraisers available at the moment.</p>
                    ) : (
                        <>
                            <div className="fundraiser-grid">
                                {currentFunds.map((f) => (
                                    <Link to={`/donate/${f._id}`} key={f._id} className="fundraiser-card">
                                        <div
                                            className="card-image"
                                            style={{ backgroundImage: `url(${f.coverImage})` }}
                                        />
                                        <div className="card-title">{f.fundraiseTitle}</div>
                                    </Link>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        className="page-button"
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Prev
                                    </button>

                                    {[...Array(totalPages)].map((_, idx) => (
                                        <button
                                            key={idx + 1}
                                            className={`page-button ${currentPage === idx + 1 ? 'active' : ''}`}
                                            onClick={() => goToPage(idx + 1)}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}

                                    <button
                                        className="page-button"
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div></>}
            </div>
        </div>
        <Trending />
        <Footer></Footer>
    </>);
};

export default Search;