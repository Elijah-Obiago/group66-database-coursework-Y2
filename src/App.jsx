import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/authContext.jsx";
import Home from "./components/views/Home.jsx";
import Clinicians from "./components/views/Clinicians.jsx";
import Layout from "./components/layout/Layout.jsx";
import Clinics from "./components/views/Clinics.jsx";
import Login from "./components/views/Login.jsx";
import PageNotFound from "./components/views/404.jsx";

function App() {
  //Initialisation ------------------------------------
  //State ---------------------------------------------
  //Handlers ------------------------------------------
  //View ---------------------------------------------

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clinicians" element={<Clinicians />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
