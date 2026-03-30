import "./Header.scss";
import { useAuth } from "../auth/authContext.jsx";

const Header = () => {
  //Initialisation ------------------------------------
  const { loggedInUser } = useAuth();

  //State ---------------------------------------------

  //Handlers ------------------------------------------
  //View ---------------------------------------------
  return (
    <header>
      <h1>Travel Jab Clinic</h1>
      {loggedInUser && loggedInUser.StaffFirstname && (
        <p className="welcome">Welcome {loggedInUser.StaffFirstname}!</p>
      )}
      {loggedInUser && loggedInUser.PatientFirstname && (
        <p className="welcome">Welcome {loggedInUser.PatientFirstname}!</p>
      )}
    </header>
  );
};

export default Header;
