import Action from "../../UI/Actions.jsx";
import "./ClinicForm.scss";

const ClinicForm = (props) => {
  //Initialisation --------------------------------------
  // State -----------------------------------------------
  // Handlers -----------------------------------------
  // View ---------------------------------------------
  return (
    <div className="clinicForm">
      <p>This is your form!</p>
      <Action.Tray>
        <Action.Cancel
          showText
          buttonText="Cancel form"
          onClick={props.onCancel}
        />
      </Action.Tray>
    </div>
  );
};

export default ClinicForm;
