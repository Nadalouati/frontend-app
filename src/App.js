import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard";
import Login from "./Pages/Admin/Login";
import AddLivreur from "./Pages/Admin/AddLivreur";
import AddEntreprise from "./Pages/Admin/AddEntreprise";
import Home from "./Pages/Home";
import PrivateRoutes from "./Routes/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Home />} path="/" exact />
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/Admin/Dashboard" />
            <Route element={<AddLivreur />} path="/Admin/AddLivreur" />
            <Route element={<AddEntreprise />} path="/Admin/AddEntreprise" />
          </Route>

          <Route element={<Login />} path="/Admin/Login" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
