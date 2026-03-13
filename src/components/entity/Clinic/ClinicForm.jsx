import { useState, useEffect } from "react";
import Action from "../../UI/Actions.jsx";
import Spacer from "../../UI/Spacer.jsx";
import "./ClinicForm.scss";

const initialClinic = {
  ClinicID: null,
  ClinicName: null,
  ClinicPostcode: null,
  ClinicAddressID: null,
  ClinicContactID: null,
  ClinicManagerID: null,
  ClinicImageURL: "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
};

const ClinicForm = ({ onCancel }) => {
  //Initialisation --------------------------------------
  const conformance = {
    js2html: {
      ClinicID: (value) => (value === null ? "0" : value),
      ClinicName: (value) => (value === null) ? '' : value,
      ClinicPostcode: (value) => (value === null) ? '' : value,
      ClinicAddressID: (value) => (value === null) ? '0' : value,
      ClinicContactID: (value) => (value === null) ? '0' : value,
      ClinicManagerID: (value) => (value === null) ? '0' : value,
      ClinicImageURL: (value) => (value === null) ? '' : value,
    },
    html2js: {
      ClinicID: (value) => (value === null ? null : value),
      ClinicName: (value) => (value === '' ? null : value),
      ClinicPostcode: (value) => (value === '' ? null : value),
      ClinicAddressID: (value) => (value === '0' ? null : value),
      ClinicContactID: (value) => (value === '0' ? null : value),
      ClinicManagerID: (value) => (value === '0' ? null : value),
      ClinicImageURL: (value) => (value === '' ? null : value),
    },
  };

  const apiURL = "https://softwarehub.uk/unibase/traveljabs/v1/api";
  const clinicsEndpoint = `${apiURL}/clinics`;
  const staffEndpoint = `${apiURL}/staff`;

  // State -----------------------------------------------
  const [clinic, setClinic] = useState(initialClinic);
  const [clinics, setClinics] = useState(null);
  const [staff, setStaff] = useState(null);

  const apiGET = async (endpoint, setState) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setState(result);
  };

  useEffect(() => {
    apiGET(clinicsEndpoint, setClinics);
  }, [clinicsEndpoint]);

  useEffect(() => {
    apiGET(staffEndpoint, setStaff);
  }, [staffEndpoint]);

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
            {!clinics ? (
              <p>Loading records ...</p>
            ) : (
              <select
                name="ClinicAddressID"
                value={conformance.js2html.ClinicAddressID(clinic.ClinicAddressID)}
                onChange={handleChange}
              >
                <option value="0" hidden>
                  No address selected
                </option>

                {clinics.map((item) => (
                  <option key={item.ClinicID} value={item.ClinicID}>
                    {item.ClinicAddress}
                  </option>
                ))}
              </select>
            )}
          </label>

          <label>
            Clinic Contact
            {!clinics ? (
              <p>Loading records ...</p>
            ) : (
              <select
                name="ClinicContactID"
                value={conformance.js2html.ClinicContactID(clinic.ClinicContactID)}
                onChange={handleChange}
              >
                <option value="0" hidden>
                  No contact selected
                </option>

                {clinics.map((item) => (
                  <option key={item.ClinicID} value={item.ClinicID}>
                    {item.ClinicContact}
                  </option>
                ))}
              </select>
            )}
          </label>

          <label>
            Clinic Manager
            {!staff ? (
              <p>Loading records ...</p>
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