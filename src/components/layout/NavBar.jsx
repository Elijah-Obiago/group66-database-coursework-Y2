import { NavLink } from "react-router-dom";
import "./NavBar.scss";

function NavBar() {
  return (
    <nav>
      <div className="navItem">
        <NavLink to="/">Home</NavLink>
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
    </nav>
  );
}

export default NavBar;
