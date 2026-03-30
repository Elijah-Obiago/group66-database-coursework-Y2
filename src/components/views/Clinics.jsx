import { useState, useEffect } from "react";
import { useAuth } from "../auth/authContext.jsx";
import apiURL from "../api/apiURL.js";
import Action from "../UI/Actions.jsx";
import ClinicForm from "../entity/Clinic/ClinicForm.jsx";
import { CardContainer, Card } from "../UI/Card.jsx";
import "./Clinics.scss";
import Spacer from "../UI/Spacer.jsx";

// Initialisation -----------------------------------

const Clinics = () => {
  // Initialisation -----------------------------------
  const { loggedInUser } = useAuth();
  const clinicEnpoint =
    (loggedInUser && loggedInUser.StaffRoleName === "Clinician") ||
    (loggedInUser && loggedInUser.StaffRoleName === "Manager")
      ? `${apiURL}/clinics/${loggedInUser.StaffClinicID}`
      : `${apiURL}/clinics`;
  const postClinicEndpoint = `${apiURL}/clinics`;

  // State --------------------------------------------
  const [clinics, setClinics] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();

    Array.isArray(result) ? setClinics(result) : setClinics([result]);
  };

  useEffect(() => {
    apiGet(clinicEnpoint);
  }, [clinicEnpoint]);

  const apiPost = async (endpoint, record) => {
    //Request
    const request = {
      method: "POST",
      body: JSON.stringify(record),
      headers: { "Content-Type": "application/json" },
    };

    //Fetch
    const response = await fetch(endpoint, request);
    const result = await response.json();
    //setClinics(result);

    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  // Handlers -----------------------------------------
  const handleAdd = (clinic) => {
    setShowForm(true);
  };

  const handleCancel = (clinic) => {
    setShowForm(false);
  };

  const handleSubmit = async (clinic) => {
    const result = await apiPost(postClinicEndpoint, clinic);
    if (result.isSuccess) {
      setShowForm(false);
      apiGet(clinicEnpoint);
    } else alert(`Submission unsuccessful: ${result.message}`);
  };

  // View ---------------------------------------------
  return (
    <>
      <h1>Clinics</h1>

      <Spacer>
        {!showForm &&
        loggedInUser &&
        loggedInUser.StaffRoleName === "Manager" ? (
          <Action.Tray>
            <Action.Add
              showText
              buttonText="Add new clinic location"
              onClick={handleAdd}
            />
          </Action.Tray>
        ) : showForm === true ? (
          <ClinicForm onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : null}

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
                        src={
                          clinic.ClinicImageURL ??
                          "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg"
                        }
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
};

export default Clinics;
