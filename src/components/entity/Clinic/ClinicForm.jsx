import { useState, useEffect } from "react";
import useLoad from "../../api/useLoad.js";
import { apiURL } from "../../api/apiURL.js";
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

  const validation = {

    isValid: {
      ClinicName: (name) => name && name.length>8,
      ClinicPostcode: (postcode) => postcode && postcode.length > 4 && postcode.length < 8,
      ClinicAddress: (address) => address && address.length>10,
      ClinicContact: (contact) => contact && contact.length>10,
      ClinicManagerID: (id) => id === null || id > 0,
      ClinicImageURL: (url) => /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(url),

    },
    errorMessage: {
      ClinicName: 'Clinic name is too short',
      ClinicPostcode: 'Not valid postcode',
      ClinicAddress: 'Not valid address',
      ClinicContact: 'Contact number is too short',
      ClinicManagerID: 'Invalid manager has been selected',
      ClinicImageURL: 'The URL entered is not a valid URL string',
    }
  }

  const clinicsEndpoint = `${apiURL}/clinics`;
  const staffEndpoint = `${apiURL}/staff`;

  // State -----------------------------------------------
  const {record: clinic, errors, handleChange, handleSubmit} = Form.useForm(initialClinic, conformance, validation, onSubmit);
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
        error={errors.ClinicName}
      />

      <Form.TextInput 
        label='Clinic Postcode'
        name='ClinicPostcode' 
        value={conformance.js2html.ClinicPostcode(clinic.ClinicPostcode)} 
        onChange={handleChange}
        error={errors.ClinicPostcode}
      />

      <Form.TextInput 
        label='Clinic Address'
        name='ClinicAddress' 
        value={conformance.js2html.ClinicAddress(clinic.ClinicAddress)} 
        onChange={handleChange}
        error={errors.ClinicAddress}
      />

      <Form.TextInput 
        label='Clinic Contact'
        name='ClinicContact' 
        value={conformance.js2html.ClinicContact(clinic.ClinicContact)} 
        onChange={handleChange}
        error={errors.ClinicContact}
      />

      <Form.TextSelect
        label='Clinic Manager'
        name='ClinicManagerID' 
        value={conformance.js2html.ClinicManagerID(clinic.ClinicManagerID)} 
        options={managerOptions}
        onChange={handleChange}
        error={errors.ClinicManagerID}
      />


      <Form.TextInput 
        label='Clinic Image URL'
        name='ClinicImageURL' 
        value={conformance.js2html.ClinicImageURL(clinic.ClinicImageURL)} 
        onChange={handleChange}
        error={errors.ClinicImageURL}
      />
    </Form>
  );
};

export default ClinicForm;
