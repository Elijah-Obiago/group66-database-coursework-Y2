import "./App.scss";

function App() {
  const loggedInUser = "User";
  return (
    <div className="layout">
      <header>
        <h1>Travel Jab Clinic</h1>
        <p className="welcome">
          Welcome to our travel vaccination clinic, {loggedInUser}!
        </p>
      </header>

      <nav>
        <div className="navItem">
          <a to="/modules">Home</a>
        </div>
        <div className="navItem">
          <a to="/modules">Book Appointment</a>
        </div>
        <div className="navItem">
          <a to="/modules">My Bookings</a>
        </div>
        <div className="navItem">
          <a to="/modules">Prescriptions</a>
        </div>
        <div className="navItem">
          <a to="/modules">Settings</a>
        </div>
      </nav>

      <main>
        <p>Homepage</p>
      </main>

      <footer>
        <p className="Contact">Contact Us</p>
      </footer>
    </div>
  );
}

export default App;
