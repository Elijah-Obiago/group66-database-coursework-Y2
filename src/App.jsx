import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./components/views/Home.jsx";
import Clinics from "./components/views/Clinics.jsx";
import AppViews from "./components/views/AppViews.jsx";
import PageNotFound from "./components/views/404.jsx";

function App() {
  const loggedInUser = "User";

  return (
    <BrowserRouter>
      <Layout loggedInUser={loggedInUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/appviews" element={<AppViews />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
