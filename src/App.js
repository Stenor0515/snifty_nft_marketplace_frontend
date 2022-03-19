import "./App.css";
import Home from "./pages/home";
import { Routes, Route, useLocation } from "react-router-dom";
import Details from "./pages/detail";
import MarketPlace from "./pages/marketplace";
import Profile from "./pages/profile";
import Auction from "./pages/auction";
import { useEffect } from "react";
function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/details/:itemId" element={<Details />} />
        <Route path="marketplace" element={<MarketPlace />} />
        <Route path="profile" element={<Profile />} />
        <Route path="auction" element={<Auction />} />
      </Routes>
    </>
  );
}

export default App;
