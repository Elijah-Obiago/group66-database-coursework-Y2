import useLoad from "../api/useLoad.js";
import API from "../api/API.js";
import Action from "../UI/Actions.jsx";
import ClinicForm from "../entity/Clinic/ClinicForm.jsx";
import { CardContainer, Card } from "../UI/Card.jsx";
import "./Clinics.scss";
import { Modal, useModal } from "../UI/Modal.jsx";
import { Alert, Error, useAlert } from "../UI/Alert.jsx";
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


  const myGroupEndpoint = `/clinics`;
  const postMyGroupEndpoint = `/clinics`;

  // State --------------------------------------------
  const [clinics, loadingMessage, loadClinics] = useLoad(myGroupEndpoint);
  const [isFormOpen, openForm, closeForm] = useModal(false);
  const [isAlertOpen, alertMessage, openAlert, closeAlert] = useAlert();
  const [isErrorOpen, errorMessage, openError, closeError] = useAlert();
  
  // Handlers -----------------------------------------
  const handleSubmit = async (clinic) => {
    const result = await API.post(postMyGroupEndpoint, clinic);
    if (result.isSuccess) {
      closeForm();
      loadClinics(myGroupEndpoint);
      openAlert('Submission successful')
    } else openError(`Submission unsuccessful: ${result.message}`)
  };

  
  // View ---------------------------------------------
  return (
    <>
      <h1>Clinics</h1>

      {isFormOpen && (
      <Modal title='Add new clinic location'>
        <ClinicForm onSubmit={handleSubmit} onCancel={closeForm} />
      </Modal>
      )}

      {isAlertOpen && <Alert message = {alertMessage}onDismiss = {closeAlert}/>}
      {isErrorOpen && <Error message = {errorMessage}onDismiss = {closeError}/>}

      <Spacer>
          <Action.Tray>
            <Action.Add
              showText
              buttonText="Add new clinic location"
              onClick={openForm}
            />
          </Action.Tray>

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
