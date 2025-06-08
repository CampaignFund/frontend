import Home from "./pages/HomePage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import PageNotFound from "./pages/PageNotFound";
import Signin from "./pages/Signin";
import Search from "./pages/Search";
import Donate from "./pages/Donate";
import Discover from "./pages/Category";
import StartFund from "./pages/StartFund";

const App = ()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/donate" element={<Donate/>} />
        <Route path="/discover" element={<Discover/>} />
        <Route path="/campaign" element={<StartFund/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;