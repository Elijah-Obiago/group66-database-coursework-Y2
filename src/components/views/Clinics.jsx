import useLoad from "../api/useLoad.js";
import { useAuth } from "../auth/authContext.jsx";
import API from "../api/API.js";
import { apiURL } from "/src/components/api/apiURL.js";
import Action from "../UI/Actions.jsx";
import ClinicForm from "../entity/Clinic/ClinicForm.jsx";
import { CardContainer, Card } from "../UI/Card.jsx";
import "./Clinics.scss";
import { Modal, useModal } from "../UI/Modal.jsx";
import { Alert, Error, useAlert } from "../UI/Alert.jsx";
import Spacer from "../UI/Spacer.jsx";
import { useState } from "react";
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

  const myGroupEndpoint = `${apiURL}/clinics`;
  const postMyGroupEndpoint = `${apiURL}/clinics`;

  const [clinics, loadingMessage, loadClinics] = useLoad(myGroupEndpoint);
  const [showForm, setShowForm] = useState(false);
  const [isFormOpen, openForm, closeForm] = useModal(false);
  const [isAlertOpen, alertMessage, openAlert, closeAlert] = useAlert();
  const [isErrorOpen, errorMessage, openError, closeError] = useAlert();

  // Handlers -----------------------------------------
  const handleSubmit = async (clinic) => {
    const result = await API.post(postMyGroupEndpoint, clinic);
    if (result.isSuccess) {
      closeForm();
      loadClinics(myGroupEndpoint);
      openAlert("Submission successful");
    } else openError(`Submission unsuccessful: ${result.message}`);
  };

  // View ---------------------------------------------
  return (
    <>
      <h1>Clinics</h1>

      {isFormOpen && (
        <Modal title="Add new clinic location">
          <ClinicForm onSubmit={handleSubmit} onCancel={closeForm} />
        </Modal>
      )}

      {isAlertOpen && <Alert message={alertMessage} onDismiss={closeAlert} />}
      {isErrorOpen && <Error message={errorMessage} onDismiss={closeError} />}

      <Spacer>
        {!showForm &&
        loggedInUser &&
        loggedInUser.StaffRoleName === "Manager" ? (
          <Action.Tray>
            <Action.Add
              showText
              buttonText="Add new clinic location"
              onClick={openForm}
            />
          </Action.Tray>
        ) : showForm === true ? (
          <ClinicForm onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : null}

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
