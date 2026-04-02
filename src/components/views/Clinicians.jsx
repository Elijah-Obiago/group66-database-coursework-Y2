import { useAuth } from "../auth/authContext.jsx";
import API from "../api/API.js";
import { apiURL } from "../api/apiURL.js";
import "./Home.scss";
import Spacer from "../UI/Spacer.jsx";
import { useState, useEffect } from "react";
import "./Clinicians.scss";
import Action from "../UI/Actions.jsx";
import { CardContainer, Card } from "../UI/Card.jsx";
import ClinicianForm from "../entity/Clinic/ClinicianForm.jsx";

const Clinicians = () => {
  // Initialisation -----------------------------------
  const { loggedInUser } = useAuth();

  {editingClinician ? (
    <ClinicianForm
      initialData={editingClinician}
      onSubmit={handleUpdate}
      onCancel={() => setEditingClinician(null)}
    />
  ) : !showForm && loggedInUser?.StaffRoleName === "Manager" ? (
    <Action.Tray>
      <Action.Add
        showText buttonText="Add new clinician"
        onClick={handleAdd}
      />
    </Action.Tray>
  ) : null}

  const clinicianEndpoint =
    loggedInUser && loggedInUser.StaffRoleName === "Clinician"
      ? `${apiURL}/staff/clinics/${loggedInUser.StaffClinicID}`
      : loggedInUser && loggedInUser.StaffRoleName === "Manager"
        ? `${apiURL}/staff/clinics/${loggedInUser.StaffClinicID}`
        : null;
  const postClinicianEndpoint = `${apiURL}/staff`;

  // State --------------------------------------------
  const [clinicians, setClinicians] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingClinician, setEditingClinician] = useState(null);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();

    Array.isArray(result) ? setClinicians(result) : setClinicians([result]);
  };

  useEffect(() => {
    if (clinicianEndpoint !== null) {
      apiGet(clinicianEndpoint);
    }
  }, [clinicianEndpoint]);

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
    //setClinicians(result);

    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  const apiDelete = async (endpoint, record) => {
    const request = {
      method: "DELETE",
      body: JSON.stringify(record),
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(endpoint, request);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
    };

    const apiPut = async (endpoint, record) => {
    //Request
    const request = {
      method: "PUT",
      body: JSON.stringify(record),
      headers: { "Content-Type": "application/json" },
    };

    //Fetch
    const response = await fetch(endpoint, request);
    const result = await response.json();
    //setClinicians(result);

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
    const result = await apiPost(postClinicianEndpoint, clinician);
    if (result.isSuccess) {
      setShowForm(false);
      apiGet(clinicianEndpoint);
    } else alert(`Submission unsuccessful: ${result.message}`);
  };

  const handleDelete = async (clinician) => {
    const result = await apiDelete(`${apiURL}/staff/${ clinician.StaffID }`);
    if (result.isSuccess) {      apiGet(clinicianEndpoint);
    } else alert(`Deletion unsuccessful: ${result.message}`);
  

  const handleUpdate = async (clinician) => {
    const result = await apiPut(`${apiURL}/staff/${ clinician.StaffID }`, clinician);
  };   if (result.isSuccess) {      apiGet(clinicianEndpoint);
    } else alert(`Update unsuccessful: ${result.message}`);
  };

  // View ---------------------------------------------
  return (
    <>
      <h2>Clinicians</h2>

      <Spacer>
        {!showForm &&
        loggedInUser &&
        loggedInUser.StaffRoleName === "Manager" ? (
          <Action.Tray>
            <Action.Add
              showText
              buttonText="Add new clinician"
              onClick={handleAdd}
            />
          </Action.Tray>
        ) : showForm === true ? (
          <ClinicianForm onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : null}

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
                          clinician.StaffImageURL ??
                          "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg"
                        }
                        alt={clinician.StaffFirstname}
                      />
                      <p>{clinician.StaffContact}</p>
                      <Action.Tray>
                        <Action.Modify onClick={() => setEditingClinician(clinician)}/>
                        <Action.Delete onClick={() => handleDelete(clinician)}/>
                      </Action.Tray>
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

export default Clinicians;
