import { useState, useEffect } from "react";
import useLoad from "../../api/useLoad.js";
import apiURL from "../../api/apiURL.js";
import Form from "../../UI/Form.jsx";

import "./ClinicForm.scss";

const initialClinic = {
  ClinicID: null,
  ClinicName: null,
  ClinicPostcode: null,
  ClinicAddress: null,
  ClinicContact: null,
  ClinicManagerID: null,
  ClinicImageURL:
    "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
};

const ClinicForm = ({ onSubmit, onCancel }) => {
  //Initialisation --------------------------------------
  const conformance = {
    js2html: {
      ClinicID: (value) => (value === null ? "0" : value),
      ClinicName: (value) => (value === null ? "" : value),
      ClinicPostcode: (value) => (value === null ? "" : value),
      ClinicAddress: (value) => (value === null ? "" : value),
      ClinicContact: (value) => (value === null ? "" : value),
      ClinicManagerID: (value) => (value === null ? "0" : value),
      ClinicImageURL: (value) => (value === null ? "" : value),
    },
    html2js: {
      ClinicID: (value) => (value === null ? null : value),
      ClinicName: (value) => (value === "" ? null : value),
      ClinicPostcode: (value) => (value === "" ? null : value),
      ClinicAddress: (value) => (value === "" ? null : value),
      ClinicContact: (value) => (value === "" ? null : value),
      ClinicManagerID: (value) => (value === "0" ? null : value),
      ClinicImageURL: (value) => (value === "" ? null : value),
    },
  };

  const clinicsEndpoint = `${apiURL}/clinics`;
  const staffEndpoint = `${apiURL}/staff`;

  // State -----------------------------------------------
  const [clinic, handleChange, handleSubmit] = Form.useForm(initialClinic, conformance, onSubmit);
  const [clinics, loadingClinicsMessage] = useLoad(clinicsEndpoint);
  const [staff, loadingStaffMessage] = useLoad(staffEndpoint);


  // Handlers -----------------------------------------

  // View --------------------------------------------
  const managerOptions = {
    noOptionsMessage: loadingStaffMessage,
    unselected: {value: '0', label: 'No manager selected'},
    list: staff && staff.map((user) => ({value: user.StaffID, label: `${user.StaffFirstname} ${user.StaffLastname}`}))
  };

  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>

      <Form.TextInput 
        label='Clinic Name' 
        name='ClinicName' 
        value={conformance.js2html.ClinicName(clinic.ClinicName)} 
        onChange={handleChange}
      />

      <Form.TextInput 
        label='Clinic Postcode'
        name='ClinicPostcode' 
        value={conformance.js2html.ClinicPostcode(clinic.ClinicPostcode)} 
        onChange={handleChange}
      />

      <Form.TextInput 
        label='Clinic Address'
        name='ClinicAddress' 
        value={conformance.js2html.ClinicAddress(clinic.ClinicAddress)} 
        onChange={handleChange}
      />

      <Form.TextInput 
        label='Clinic Contact'
        name='ClinicContact' 
        value={conformance.js2html.ClinicContact(clinic.ClinicContact)} 
        onChange={handleChange}
      />

      <Form.TextSelect
        label='Clinic Manager'
        name='ClinicManagerID' 
        value={conformance.js2html.ClinicManagerID(clinic.ClinicManagerID)} 
        options={managerOptions}
        onChange={handleChange}
      />



          <label>
            Clinic Manager
            {!staff ? (
              <p>{loadingStaffMessage}</p>
            ) : (
              <select
                name="ClinicManagerID"
                value={conformance.js2html.ClinicManagerID(
                  clinic.ClinicManagerID,
                )}
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

      <Form.TextInput 
        label='Clinic Image URL'
        name='ClinicImageURL' 
        value={conformance.js2html.ClinicImageURL(clinic.ClinicImageURL)} 
        onChange={handleChange}
      />

    </Form>
  );
};

export default ClinicForm;
