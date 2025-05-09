import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/src/assets/images/argentBankLogo.png";
import { logout } from "../features/auth/authSlice.js";

function Header() {
  /* Updates user data on header component from state redux */
  const isConnected = useSelector((state) => state.auth.token);
  const firstname = useSelector((state) => state.auth.userData?.firstname);
  // const lastname = useSelector((state) => state.auth.userData?.lastname);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };
  return (
    <header>
      {/* <h1 className="sr-only">Argent Bank</h1> */}
      {/* <nav class="main-nav">
        <a class="main-nav-logo" href="./index.html">
          <img
            class="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 class="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a class="main-nav-item" href="./sign-in.html">
            <i class="fa fa-user-circle"></i>
            Sign In
          </a>
        </div>
      </nav> */}
      <nav className="main-nav">
        <Link to="/">
          <img className="main-nav-logo-image" src={Logo} alt="Bank Logo" />
        </Link>
        {isConnected ? (
          <div className="connected">
            <Link to="/profile">
              <i className="fa-solid fa-2x fa-circle-user" />
              <p>{firstname}</p>
            </Link>
            <Link to="/" onClick={logoutHandler}>
              <i className="fa-solid fa-arrow-right-from-bracket" />
              <p> Sign out </p>
            </Link>
          </div>
        ) : (
          <div className="not-connected">
            <Link to="/login">
              <i className="fa fa-user-circle"></i>
              <p>Sign In</p>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
