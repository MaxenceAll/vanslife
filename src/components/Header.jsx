import { Link, NavLink } from "react-router-dom/dist";
import loginImg from "../assets/images/loginImg.svg"

function Header() {
  return (
    <header>
    <Link className="site-logo" to="/">#VanLife</Link>
    <nav>
        <NavLink 
            to="/host"
            className={({isActive}) => isActive ? "active-link" : null}
        >
            Admin
        </NavLink>
        <NavLink 
            to="/about"
            className={({isActive}) => isActive ? "active-link" : null}
        >
            About
        </NavLink>
        <NavLink 
            to="/vans"
            className={({isActive}) => isActive ? "active-link" : null}
        >
            Vans
        </NavLink>
        <Link to="login" className="login-link">
                    <img 
                        src={loginImg}
                        className="login-icon"
                    />
                </Link>
    </nav>
</header>
  );
}

export default Header;
