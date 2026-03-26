import "./Home.scss";
import Spacer from "../UI/Spacer.jsx";
import { useState, useEffect } from "react";
import "./Clinicians.scss";
import Action from "../UI/Actions.jsx";
import { CardContainer, Card } from "../UI/Card.jsx";
import ClinicianForm from "../entity/Clinic/ClinicianForm.jsx";

// Initialisation -----------------------------------

function Clinicians() {
  const newClinician = {
    StaffID: 0,
    StaffFirstname: "New",
    StaffLastname: "Clinician",
    StaffRoleID: 0,
    StaffClinicID: 0,
    StaffRoleName: "Clinician",
    StaffClinicName: "TravelJabs New Clinic",
    StaffImageURL:
      "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
    StaffContact: "01234567890",
  };

  const apiURL = "https://softwarehub.uk/unibase/traveljabs/v1/api";
  const myGroupEndpoint = `${apiURL}/staff`;
  const postMyGroupEndpoint = `${apiURL}/staff`;

  // State --------------------------------------------
  const [clinicians, setClinicians] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setClinicians(result);
  };

  useEffect(() => {
    apiGet(myGroupEndpoint);
  }, [myGroupEndpoint]);

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
    setClinicians(result);

    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  // Handlers -----------------------------------------
  const handleAdd = (clinician) => {
    setShowForm(true);
  };

  const handleCancel = (clinician) => {
    setShowForm(false);
  };

  const handleSubmit = async (clinician) => {
    const result = await apiPost(postMyGroupEndpoint, clinician);
    if (result.isSuccess) {
      setShowForm(false);
      apiGet(myGroupEndpoint);
    } else alert(`Submission unsuccessful: ${result.message}`);
  };

  // View ---------------------------------------------
  return (
    <>
      <h2>Clinicians</h2>

      <Spacer>
        {!showForm ? (
          <Action.Tray>
            <Action.Add
              showText
              buttonText="Add new clinician"
              onClick={handleAdd}
            />
          </Action.Tray>
        ) : (
          <ClinicianForm onSubmit={handleSubmit} onCancel={handleCancel} />
        )}

        {!clinicians ? (
          <p>Loading records ...</p>
        ) : (
          <>
            <CardContainer>
              {clinicians.map((clinician) => {
                return (
                  <div className="clinicianCard" key={clinician.StaffID}>
                    <Card>
                      <p>
                        {clinician.StaffFirstname} {clinician.StaffLastname}
                      </p>
                      <p>{clinician.StaffRoleName}</p>
                      <img
                        src={
                          clinician.StaffImageURL ?? newClinician.StaffImageURL
                        }
                        alt={clinician.StaffFirstname}
                      />
                      <p>{clinician.StaffContact}</p>
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

export default Clinicians;
