import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext.jsx";
import Action from "../UI/Actions.jsx";
import "./Login.scss";

const patient = {
  PatientID: 1,
  PatientFirstname: "Oliver",
  PatientLastname: "Hayes",
  PatientAddress: "14 North Street, Canterbury, Kent",
  PatientPostcode: "CT1 2JS",
  PatientAge: 34,
};

const staff = {
  StaffID: 31,
  StaffFirstname: "Hamza",
  StaffLastname: "Farid",
  StaffRoleID: 2,
  StaffClinicID: 9,
  StaffRoleName: "Clinician",
  StaffClinicName: "TravelJabs Milton Keynes",
};

const manager = {
  StaffID: 57,
  StaffFirstname: "Ibrahim ",
  StaffLastname: "Pibrahim",
  StaffRoleID: 1,
  StaffClinicID: 10,
  StaffRoleName: "Manager",
  StaffClinicName: "TravelJabs Oxford",
};

const Login = () => {
  //Initialisation ------------------------------------
  const { login } = useAuth();
  const navigate = useNavigate();
  //State ---------------------------------------------
  //Handlers ------------------------------------------
  const handleLogin = (user) => {
    login(user);
    navigate("/");
  };

  //View ---------------------------------------------
  return (
    <>
      <h1>Login</h1>
      <Action.Tray>
        <Action.Add
          showText
          buttonText="Patient Login"
          onClick={() => handleLogin(patient)}
        />
        <Action.Add
          showText
          buttonText="Staff Login"
          onClick={() => handleLogin(staff)}
        />
        <Action.Add
          showText
          buttonText="Manager Login"
          onClick={() => handleLogin(manager)}
        />
      </Action.Tray>
    </>
  );
};

export default Login;
