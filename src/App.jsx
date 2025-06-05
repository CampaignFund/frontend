import Home from "./pages/HomePage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import PageNotFound from "./pages/PageNotFound";

const App = ()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;