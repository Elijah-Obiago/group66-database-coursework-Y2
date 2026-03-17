import { use, useState } from "react";
import Action from "../../UI/Actions.jsx";
import Spacer from "../../UI/Spacer.jsx";
import "./ClinicForm.scss";

const initialClinic = {
  ClinicName: "",
  ClinicPostcode: "",
  ClinicAddress: "",
  ClinicContact: "",
  ClinicManagerFirstname: "",
  ClinicManagerLastname: "",
  ClinicImageURL: "",
};

const ClinicForm = ({ onCancel }) => {
  //Initialisation --------------------------------------
  // State -----------------------------------------------
  const [clinic, setClinic] = useState(initialClinic);

  // Handlers -----------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    setClinic({ ...clinic, [name]: value });
  };

  const handleSubmit = () => alert(JSON.stringify(clinic));
  // View ---------------------------------------------
  return (
    <div className="clinicForm">
      <Spacer>
        <div className="FormTray">
          <label>
            Clinic Name
            <input
              type="text"
              name="ClinicName"
              value={clinic.ClinicName}
              onChange={handleChange}
            />
          </label>

          <label>
            Clinic Postcode
            <input
              type="text"
              name="ClinicPostcode"
              value={clinic.ClinicPostcode}
              onChange={handleChange}
            />
          </label>

          <label>
            Clinic Address
            <input
              type="text"
              name="ClinicAddress"
              value={clinic.ClinicAddress}
              onChange={handleChange}
            />
          </label>

          <label>
            Clinic Contact
            <input
              type="text"
              name="ClinicContact"
              value={clinic.ClinicContact}
              onChange={handleChange}
            />
          </label>

          <label>
            Clinic Manager Firstname
            <input
              type="text"
              name="ClinicManagerFirstname"
              value={clinic.ClinicManagerFirstname}
              onChange={handleChange}
            />
          </label>

          <label>
            Clinic Manager Lastname
            <input
              type="text"
              name="ClinicManagerLastname"
              value={clinic.ClinicManagerLastname}
              onChange={handleChange}
            />
          </label>

          <label>
            Clinic Image URL
            <input
              type="text"
              name="ClinicImageURL"
              value={clinic.ClinicImageURL}
              onChange={handleChange}
            />
          </label>
        </div>
        <Action.Tray>
          <Action.Submit showText buttonText="Submit" onClick={handleSubmit} />
          <Action.Cancel showText buttonText="Cancel form" onClick={onCancel} />
        </Action.Tray>
      </Spacer>
    </div>
  );
};

export default ClinicForm;
