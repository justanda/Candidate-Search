import { Link } from "react-router-dom";

const Nav = () => (
  <nav className="nav">
    <Link to="/" className="nav-link">
      Home
    </Link>
    <Link to="/potential-candidates" className="nav-link">
      Potential Candidates
    </Link>
  </nav>
);

export default Nav;
