import Logo from "../Logo";
import "../../pages/Landing/Landing.css";

const Navbar = ({ handleNavigate }) => {
  return (
    <nav className="navContainer">
      <Logo />
      <div className="navBtns">
        <button
          className="mybtn nav-login-btn"
          onClick={(e) => handleNavigate(e, "login")}
        >
          Login
        </button>
        <button
          className="mybtn secBtn"
          onClick={(e) => handleNavigate(e, "signup")}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
