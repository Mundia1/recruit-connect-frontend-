import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import JobBoard from "./pages/JobBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<JobBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
