import { useState, useEffect } from "react";
import Action from "../../UI/Actions.jsx";
import Spacer from "../../UI/Spacer.jsx";
import "./ClinicianForm.scss";

const initialClinician = {
  StaffID: null,
  StaffFirstname: null,
  StaffLastname: null,
  StaffRoleID: null,
  StaffClinicID: null,
  StaffRoleName: "Clinician",
  StaffClinicName: "TravelJabs New Clinic",
  StaffImageURL:
    "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
};

function ClinicianForm({ onSubmit, onCancel }) {
  //Initialisation --------------------------------------
  const conformance = {
    js2html: {
      StaffID: (value) => (value === null ? "0" : value),
      StaffFirstname: (value) => (value === null ? "" : value),
      StaffLastname: (value) => (value === null ? "" : value),
      StaffRoleID: (value) => (value === null ? "0" : value),
      StaffClinicID: (value) => (value === null ? "0" : value),
      StaffRoleName: (value) => (value === null ? "" : value),
      StaffClinicName: (value) => (value === null ? "" : value),
      StaffImageURL: (value) => (value === null ? "" : value),
    },

    html2js: {
      StaffID: (value) => (value === null ? null : value),
      StaffFirstname: (value) => (value === "" ? null : value),
      StaffLastname: (value) => (value === "" ? null : value),
      StaffRoleID: (value) => (value === "0" ? null : value),
      StaffClinicID: (value) => (value === "0" ? null : value),
      StaffRoleName: (value) => (value === "" ? null : value),
      StaffClinicName: (value) => (value === "" ? null : value),
      StaffImageURL: (value) => (value === "" ? null : value),
      StaffImageURL: (value) => (value === "" ? null : value),
    },
  };

  const apiURL = "https://softwarehub.uk/unibase/traveljabs/v1/api";
  const clinicsEndpoint = `${apiURL}/clinics`;
  const staffEndpoint = `${apiURL}/staff`;

  // State -----------------------------------------------
  const [clinician, setClinician] = useState(initialClinician);
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

  //Handlers -----------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    setClinician((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => onSubmit(clinician);
  // View ---------------------------------------------
  return (
    <div className="clinicianForm">
      <Spacer>
        <div className="FormTray">
          <label htmlFor="StaffFirstname">First Name:</label>
          <input
            type="text"
            id="StaffFirstname"
            name="StaffFirstname"
            value={conformance.js2html.StaffFirstname(clinician.StaffFirstname)}
            onChange={handleChange}
          />
          <label htmlFor="StaffLastname">Last Name:</label>
          <input
            type="text"
            id="StaffLastname"
            name="StaffLastname"
            value={conformance.js2html.StaffLastname(clinician.StaffLastname)}
            onChange={handleChange}
          />
          <label htmlFor="StaffImageURL">Image URL:</label>
          <input
            type="text"
            id="StaffImageURL"
            name="StaffImageURL"
            value={conformance.js2html.StaffImageURL(clinician.StaffImageURL)}
            onChange={handleChange}
          />
        </div>
        <Action.Tray>
          <Action.Submit showText buttonText="Submit" onClick={handleSubmit} />
          <Action.Cancel showText buttonText="Cancel form" onClick={onCancel} />
        </Action.Tray>
      </Spacer>
    </div>
  );
}

export default ClinicianForm;
