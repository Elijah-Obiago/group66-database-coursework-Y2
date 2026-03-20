import { useState, useEffect } from "react";
import useLoad from "../../api/useLoad.js";
import apiURL from '../../api/apiURL.js';
import API from "../../api/API.js";
import Action from "../../UI/Actions.jsx";
import Spacer from "../../UI/Spacer.jsx";
import "./ClinicForm.scss";
import useLoad from "../../api/useLoad.js";

const initialClinic = {
  ClinicID: null,
  ClinicName: null,
  ClinicPostcode: null,
  ClinicAddress: null,
  ClinicContact: null,
  ClinicManagerID: null,
  ClinicImageURL: "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
};

const ClinicForm = ({ onSubmit, onCancel }) => {
  //Initialisation --------------------------------------
  const conformance = {
    js2html: {
      ClinicID: (value) => (value === null ? "0" : value),
      ClinicName: (value) => (value === null) ? '' : value,
      ClinicPostcode: (value) => (value === null) ? '' : value,
      ClinicAddress: (value) => (value === null) ? '' : value,
      ClinicContact: (value) => (value === null) ? '' : value,
      ClinicManagerID: (value) => (value === null) ? '0' : value,
      ClinicImageURL: (value) => (value === null) ? '' : value,
    },
    html2js: {
      ClinicID: (value) => (value === null ? null : value),
      ClinicName: (value) => (value === '' ? null : value),
      ClinicPostcode: (value) => (value === '' ? null : value),
      ClinicAddress: (value) => (value === '' ? null : value),
      ClinicContact: (value) => (value === '' ? null : value),
      ClinicManagerID: (value) => (value === '0' ? null : value),
      ClinicImageURL: (value) => (value === '' ? null : value),
    },
  };


  const clinicsEndpoint = `${apiURL}/clinics`;
  const staffEndpoint = `${apiURL}/staff`;

  // State -----------------------------------------------
  const [clinic, setClinic] = useState(initialClinic);
  const [clinics, loadingClinicsMessage,] = useLoad(clinicsEndpoint);
  const [staff, loadingStaffMessage,] = useLoad(staffEndpoint);

  // Handlers -----------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    setClinic({ ...clinic, [name]: conformance.html2js[name](value) });
  };

  const handleSubmit = () => onSubmit(clinic);
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
            Clinic Manager
            {!staff ? (
              <p>{loadingStaffMessage}</p>
            ) : (
              <select
                name="ClinicManagerID"
                value={conformance.js2html.ClinicManagerID(clinic.ClinicManagerID)}
                onChange={handleChange}
              >
                <option value="0" hidden>
                  No manager selected
                </option>

                {staff.map((user) => (
                  <option key={user.StaffID} value={user.StaffID}>
                    {`${user.StaffFirstname} ${user.StaffLastname}`}
                  </option>
                ))}
              </select>
            )}
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