import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext.jsx";
import Action from "../UI/Actions.jsx";
import "./Login.scss";

const patient = {
  UserID: 0,
  UserFirstname: "Timur",
  UserUserType: 1,
};

const staff = {
  UserID: 0,
  UserFirstname: "Yousef",
  UserUserType: 2,
};

const manager = {
  UserID: 0,
  UserFirstname: "Elijah",
  UserUserType: 3,
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
