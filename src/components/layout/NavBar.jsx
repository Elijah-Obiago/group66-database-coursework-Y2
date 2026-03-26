import { useAuth } from "../auth/authContext.jsx";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  //Initialisation ------------------------------------
  const { loggedInUser, logout } = useAuth();

  //State ---------------------------------------------
  //Handlers ------------------------------------------
  //View ---------------------------------------------

  return (
    <nav>
      <div className="navItem">
        <NavLink to="/">Home</NavLink>
      </div>
      {loggedInUser && (
        <>
          <div className="navItem">
            <NavLink to="/clinicians">Clinicians</NavLink>
          </div>

          <div className="navItem">
            <NavLink to="/new-appointment">New Appointment</NavLink>
          </div>

          <div className="navItem">
            <NavLink to="/bookings">My Bookings</NavLink>
          </div>

          <div className="navItem">
            <NavLink to="/prescriptions">Prescriptions</NavLink>
          </div>

          <div className="navItem">
            <NavLink to="/clinics">Clinics</NavLink>
          </div>

          <div className="navItem">
            <NavLink to="/settings">Settings</NavLink>
          </div>
        </>
      )}

      {!loggedInUser ? (
        <div className="navItem">
          <NavLink to="/login">Login</NavLink>
        </div>
      ) : (
        <div className="navItem">
          <NavLink to="/ " onClick={logout}>
            Logout
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
