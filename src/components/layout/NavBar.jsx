import "./NavBar.scss";

function NavBar() {
  return (
    <nav>
      <div className="navItem">
        <a href="#">Home</a>
      </div>
      <div className="navItem">
        <a href="#">New Appointment</a>
      </div>
      <div className="navItem">
        <a href="#">My Bookings</a>
      </div>
      <div className="navItem">
        <a href="#">Prescriptions</a>
      </div>
      <div className="navItem">
        <a href="#">View</a>
      </div>
      <div className="navItem">
        <a href="#">Settings</a>
      </div>
    </nav>
  );
}

export default NavBar;
