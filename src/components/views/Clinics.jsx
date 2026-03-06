import { useState, useEffect } from "react";
import Action from "../UI/Actions.jsx";
import ClinicForm from "../entity/Clinic/ClinicForm.jsx";
import { CardContainer, Card } from "../UI/Card.jsx";
import "./Clinics.scss";

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

  const apiURL = "https://softwarehub.uk/unibase/traveljabs/v1/api";
  const myGroupEndpoint = `${apiURL}/clinics`;

  // State --------------------------------------------
  const [clinics, setClinics] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setClinics(result);
  };

  useEffect(() => {
    apiGet(myGroupEndpoint);
  }, [myGroupEndpoint]);

  // Handlers -----------------------------------------
  const handleAdd = (clinic) => {
    clinic.ClinicID = Math.floor(10000 * Math.random());
    setClinics([...clinics, clinic]);
    console.log(`Length of clinics: ${clinics.length}`);
  };

  // View ---------------------------------------------
  return (
    <>
      <h1>Clinics</h1>

      {!showForm ? (
        <Action.Tray>
          <Action.Add
            showText
            buttonText="Add new clinic location"
            onClick={() => setShowForm(true)}
          />
        </Action.Tray>
      ) : (
        <ClinicForm onCancel={() => setShowForm(false)} />
      )}

      {!clinics ? (
        <p>Loading records ...</p>
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
    </>
  );
}

export default Clinics;
