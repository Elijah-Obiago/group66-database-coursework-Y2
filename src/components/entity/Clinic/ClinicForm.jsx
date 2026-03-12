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
  const conformance = {
    js2html: {
      ClinicName: (value) => (value === null) ? '' : value,
      ClinicPostcode: (value) => (value === null) ? '' : value,
      ClinicAddress: (value) => (value === null) ? '' : value,
      ClinicContact: (value) => (value === null) ? '' : value,
      ClinicManagerFirstname: (value) => (value === null) ? '' : value,
      ClinicManagerLastname: (value) => (value === null) ? '' : value,
      ClinicImageURL: (value) => (value === null) ? '' : value,
    },
    html2js: {
      ClinicName: (value) => (value === '' ? null : value),
      ClinicPostcode: (value) => (value === '' ? null : value),
      ClinicAddress: (value) => (value === '' ? null : value),
      ClinicContact: (value) => (value === '' ? null : value),
      ClinicManagerFirstname: (value) => (value === '' ? null : value),
      ClinicManagerLastname: (value) => (value === '' ? null : value),
      ClinicImageURL: (value) => (value === '' ? null : value),
    },
  };

  // State -----------------------------------------------
  const [clinic, setClinic] = useState(initialClinic);

  // Handlers -----------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    setClinic({ ...clinic, [name]: conformance.html2js[name](value) });
  };

  const handleSubmit = () => alert(JSON.stringify(clinic));
  // View --------------------------------------------
  return (
    <div className="clinicForm">
      <Spacer>
        <div className="FormTray">
          <label>
            Clinic Name
            <input
              type="text"
              name="ClinicName"
              value={conformance.js2html.ClinicName(clinic.ClinicName)}
              onChange={handleChange}
            />
          </label>

          <label>
            Clinic Postcode
            <input
              type="text"
              name="ClinicPostcode"
              value={conformance.js2html.ClinicPostcode(clinic.ClinicPostcode)}
              onChange={handleChange}
            />
          </label>

          <label>
            Clinic Address
            <input
              type="text"
              name="ClinicAddress"
              value={conformance.js2html.ClinicAddress(clinic.ClinicAddress)}
              onChange={handleChange}
            />
          </label>

          <label>
            Clinic Contact
            <input
              type="text"
              name="ClinicContact"
              value={conformance.js2html.ClinicContact(clinic.ClinicContact)}
              onChange={handleChange}
            />
          </label>

          <label>
            Clinic Manager Firstname
            <input
              type="text"
              name="ClinicManagerFirstname"
              value={conformance.js2html.ClinicManagerFirstname(clinic.ClinicManagerFirstname)}
              onChange={handleChange}
            />
          </label>

          <label>
            Clinic Manager Lastname
            <input
              type="text"
              name="ClinicManagerLastname"
              value={conformance.js2html.ClinicManagerLastname(clinic.ClinicManagerLastname)}
              onChange={handleChange}
            />
          </label>

          <label>
            Clinic Image URL
            <input
              type="text"
              name="ClinicImageURL"
              value={conformance.js2html.ClinicImageURL(clinic.ClinicImageURL)}
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
