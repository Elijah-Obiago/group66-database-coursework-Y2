import Layout from "./components/layout/Layout.jsx";
import Home from "./components/views/Home.jsx";
import Clinics from "./components/views/Clinics.jsx";
import AppViews from "./components/views/AppViews.jsx";

function App() {
  const loggedInUser = "User";
  //const test = "Test";

  return (
    <Layout loggedInUser={loggedInUser}>
      <Home />
      <Clinics />
      <AppViews />
    </Layout>
  );
}

export default App;
