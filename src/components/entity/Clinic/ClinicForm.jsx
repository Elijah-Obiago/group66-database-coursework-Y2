import Action from "../UI/Actions.jsx";
import "./ClinicForm.scss";

const ClinicForm = () => {
  //Initialisation --------------------------------------
  // State -----------------------------------------------
  // Handlers -----------------------------------------
  // View ---------------------------------------------
  return (
    <div className="clinicForm">
      <p>This is your form!</p>
      <Action.Tray>
        <Action.Cancel showText buttonText="Cancel form" />
      </Action.Tray>
    </div>
  );
};

export default ClinicForm;
