import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import DrugDetail from "./components/DrugDetail.jsx";
import Favorites from "./components/Favorites.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drug/:drugName" element={<DrugDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
