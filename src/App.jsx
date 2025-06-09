import Home from "./pages/HomePage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import PageNotFound from "./pages/PageNotFound";
import Signin from "./pages/Signin";
import Search from "./pages/Search";
import Donate from "./pages/Donate";
import Discover from "./pages/Category";
import StartFund from "./pages/StartFund";
import Profile from "./pages/Profile";
import Fundraisers from "./pages/Fundraisers";
import Dashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = ()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/donate/:id" element={<Donate/>} />
        <Route path="/fundraisers/:category?" element={<Fundraisers/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/discover" element={<Discover/>} />
        <Route path="/campaign" element={<StartFund/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/admin-dashboard" element={<Dashboard/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;