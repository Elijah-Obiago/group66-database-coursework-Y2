import "./App.scss";

function App() {
  const loggedInUser = "User";
  //const test = "Test";

  const clinics = [
    {
      ClinicID: 1,
      ClinicName: "TravelJabs Brighton",
      ClinicAddress: "12 Queens Road, Brighton, East Sussex",
      ClinicPostcode: "BN1 3XF",
      ClinicContact: "01273 800 121",
      ClinicManagerID: 1,
      ClinicManagerFirstname: "Emma",
      ClinicManagerLastname: "Collins",
      ClinicImageURL:
        "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
    },
    {
      ClinicID: 2,
      ClinicName: "TravelJabs Hastings",
      ClinicAddress: "5 Robertson Street, Hastings, East Sussex",
      ClinicPostcode: "TN34 1HL",
      ClinicContact: "01424 700 242",
      ClinicManagerID: 5,
      ClinicManagerFirstname: "Omar",
      ClinicManagerLastname: "Rahman",
      ClinicImageURL:
        "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
    },
    {
      ClinicID: 3,
      ClinicName: "TravelJabs Eastbourne",
      ClinicAddress: "22 Terminus Road, Eastbourne, East Sussex",
      ClinicPostcode: "BN21 3LP",
      ClinicContact: "01323 810 363",
      ClinicManagerID: 8,
      ClinicManagerFirstname: "Priya",
      ClinicManagerLastname: "Shah",
      ClinicImageURL:
        "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
    },
    {
      ClinicID: 4,
      ClinicName: "TravelJabs Worthing",
      ClinicAddress: "14 Montague Street, Worthing, West Sussex",
      ClinicPostcode: "BN11 3BX",
      ClinicContact: "01903 820 484",
      ClinicManagerID: 12,
      ClinicManagerFirstname: "Thomas",
      ClinicManagerLastname: "Hughes",
      ClinicImageURL:
        "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
    },
    {
      ClinicID: 5,
      ClinicName: "TravelJabs Crawley",
      ClinicAddress: "7 High Street, Crawley, West Sussex",
      ClinicPostcode: "RH10 1BW",
      ClinicContact: "01293 830 505",
      ClinicManagerID: 15,
      ClinicManagerFirstname: "Samira",
      ClinicManagerLastname: "Noor",
      ClinicImageURL:
        "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
    },
    {
      ClinicID: 6,
      ClinicName: "TravelJabs Guildford",
      ClinicAddress: "18 High Street, Guildford, Surrey",
      ClinicPostcode: "GU1 3EL",
      ClinicContact: "01483 840 626",
      ClinicManagerID: 19,
      ClinicManagerFirstname: "Mehdi",
      ClinicManagerLastname: "Farouk",
      ClinicImageURL:
        "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
    },
    {
      ClinicID: 7,
      ClinicName: "TravelJabs Woking",
      ClinicAddress: "9 Commercial Way, Woking, Surrey",
      ClinicPostcode: "GU21 6XN",
      ClinicContact: "01483 850 747",
      ClinicManagerID: 22,
      ClinicManagerFirstname: "James",
      ClinicManagerLastname: "Walker",
      ClinicImageURL:
        "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
    },
    {
      ClinicID: 8,
      ClinicName: "TravelJabs Reading",
      ClinicAddress: "25 Broad Street, Reading, Berkshire",
      ClinicPostcode: "RG1 2BH",
      ClinicContact: "0118 860 868",
      ClinicManagerID: 26,
      ClinicManagerFirstname: "Saira",
      ClinicManagerLastname: "Malik",
      ClinicImageURL:
        "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
    },
    {
      ClinicID: 9,
      ClinicName: "TravelJabs Milton Keynes",
      ClinicAddress: "6 Midsummer Boulevard, Milton Keynes, Buckinghamshire",
      ClinicPostcode: "MK9 2EA",
      ClinicContact: "01908 870 989",
      ClinicManagerID: 29,
      ClinicManagerFirstname: "Khalid",
      ClinicManagerLastname: "Nasser",
      ClinicImageURL:
        "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
    },
    {
      ClinicID: 10,
      ClinicName: "TravelJabs Oxford",
      ClinicAddress: "11 Cornmarket Street, Oxford, Oxfordshire",
      ClinicPostcode: "OX1 3EX",
      ClinicContact: "01865 880 101",
      ClinicManagerID: 33,
      ClinicManagerFirstname: "Robert",
      ClinicManagerLastname: "Mitchell",
      ClinicImageURL:
        "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
    },
  ];

  return (
    <div className="layout">
      <header>
        <h1>Travel Jab Clinic</h1>
        <p className="welcome">
          Welcome to our travel vaccination clinic, {loggedInUser}!
        </p>
      </header>

      <nav>
        <div className="navItem">
          <a href="#">Home</a>
        </div>
        <div className="navItem">
          <a href="#">New Appointment</a>
        </div>
        <div className="navItem">
          <a href="#">My Bookings</a>
        </div>
        <div className="navItem">
          <a href="#">Prescriptions</a>
        </div>
        <div className="navItem">
          <a href="#">Settings</a>
          <a to="/clinics">Home</a>
        </div>
        <div className="navItem">
          <a to="/clinics">New Appointment</a>
        </div>
        <div className="navItem">
          <a to="/clinics">My Bookings</a>
        </div>
        <div className="navItem">
          <a to="/clinics">Prescriptions</a>
        </div>
        <div className="navItem">
          <a to="/clinics">Settings</a>
        </div>
      </nav>

      <main>
        <h1>Clinics</h1>

        <div className="cardContainer">
          {clinics.map((clinic) => {
            return (
              <div className="card" key={clinic.ClinicID}>
                <p>{clinic.ClinicName}</p>
                <p>{clinic.ClinicPostcode}</p>
                <img src={clinic.ClinicImageURL} alt="Clinic" />
              </div>
            );
          })}
        </div>
        <h1>Travel Jab Clinic Locations</h1>
        {clinics.map((clinic) => {
          return (
            <div key={clinic.ClinicID} className="clinicCard">
              <p>{clinic.ClinicID}</p>
              <p>{clinic.ClinicName}</p>
              <p>{clinic.ClinicAddress}</p>
              <p>{clinic.ClinicPostcode}</p>
              <p>{clinic.ClinicContact}</p>
              <p>
                {clinic.ClinicManagerFirstname} {clinic.ClinicManagerLastname}
              </p>
              <p>{clinic.ClinicManagerID}</p>
            </div>
          );
        })}
      </main>

      <footer>
        <p className="Contact">Contact Us</p>
      </footer>
    </div>
  );
}

export default App;