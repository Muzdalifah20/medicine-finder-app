import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import DrugDetail from "./components/DrugDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drug/:drugName" element={<DrugDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
