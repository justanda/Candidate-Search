import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import PotentialCandidatesPage from "./pages/PotentialCandidatesPage";

const App = () => (
  <Router>
    <Nav />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/potential-candidates"
        element={<PotentialCandidatesPage />}
      />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  </Router>
);

export default App;
