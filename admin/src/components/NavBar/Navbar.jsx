import './Navbar.css';
import logo from '../../assets/GS.svg';

const Navbar = ({ onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} className="img-fluid logo" alt="brand" />
            </div>
            <div className="logout">
                <button className="logout-button" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
