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
  StaffID: 17,
  StaffFirstname: "Hina",
  StaffLastname: "Ahmed",
  StaffRoleID: 2,
  StaffClinicID: 5,
  StaffRoleName: "Clinician",
  StaffClinicName: "TravelJabs Crawley",
};

const manager = {
  StaffID: 15,
  StaffFirstname: "Samira",
  StaffLastname: "Noor",
  StaffRoleID: 1,
  StaffClinicID: 5,
  StaffRoleName: "Manager",
  StaffClinicName: "TravelJabs Crawley",
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
