import { useState } from "react";
import useLoad from "../api/useLoad.js";
import apiURL from '../api/apiURL.js';
import API from '../api/API.js';
import Action from "../UI/Actions.jsx";
import ClinicForm from "../entity/Clinic/ClinicForm.jsx";
import { CardContainer, Card } from "../UI/Card.jsx";
import "./Clinics.scss";
import Spacer from "../UI/Spacer.jsx";

// Initialisation -----------------------------------

function Clinics() {
  // Initialisation -----------------------------------
  const newClinic = {
    ClinicID: 0,
    ClinicName: "TravelJabs New Clinic",
    ClinicAddress: "1 Example Street, London",
    ClinicPostcode: "SW1A 1AA",
    ClinicContact: "020 0000 0000",
    ClinicManagerID: 0,
    ClinicManagerFirstname: "New",
    ClinicManagerLastname: "Manager",
    ClinicImageURL:
      "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
  };


  const myGroupEndpoint = `${apiURL}/clinics`;
  const postMyGroupEndpoint = `${apiURL}/clinics`;

  // State --------------------------------------------
  const [showForm, setShowForm] = useState(false);
  const [clinics, loadingMessage, loadClinics] = useLoad(myGroupEndpoint);

  // Handlers -----------------------------------------
  const handleAdd = (clinic) => {
    setShowForm(true);
  };

  const handleCancel = (clinic) => {
    setShowForm(false);
  };

  const handleSubmit = async (clinic) => {
    const result = await API.post(postMyGroupEndpoint, clinic);
    if (result.isSuccess) {
      setShowForm(false);
      loadClinics(myGroupEndpoint);
    }
    else alert(`Submission unsuccessful: ${result.message}`)
  };

  
  // View ---------------------------------------------
  return (
    <>
      <h1>Clinics</h1>

      <Spacer>
        {!showForm ? (
          <Action.Tray>
            <Action.Add
              showText
              buttonText="Add new clinic location"
              onClick={handleAdd}
            />
          </Action.Tray>
        ) : (
          <ClinicForm onSubmit={handleSubmit} onCancel={handleCancel} />
        )}

        {!clinics ? (
          <p>{loadingMessage}</p>
        ) : (
          <>
            <CardContainer>
              {clinics.map((clinic) => {
                return (
                  <div className="clinicCard" key={clinic.ClinicID}>
                    <Card>
                      <p>{clinic.ClinicName}</p>
                      <p>{clinic.ClinicPostcode}</p>
                      <img
                        src={clinic.ClinicImageURL ?? newClinic.ClinicImageURL}
                        alt={clinic.ClinicName}
                      />
                      <p>{clinic.ClinicContact}</p>
                      <p>
                        {clinic.ClinicManagerFirstname}{" "}
                        {clinic.ClinicManagerLastname}
                      </p>
                    </Card>
                  </div>
                );
              })}
            </CardContainer>
          </>
        )}
      </Spacer>
    </>
  );
}

export default Clinics;
