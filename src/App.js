import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard";
import Login from "./Pages/Admin/Login";
import UserLogin from "./Pages/User/UserLogin";
import LivreurLogin from "./Pages/Livreur/LivreurLogin";
import LivreurDashboard from "./Pages/Livreur/LivreurDashboard";
import LivreurDemandeLivraisons from "./Pages/Livreur/LivreurDemandeLivraisons";
import UserRegister from "./Pages/User/UserRegister";
import AddLivreur from "./Pages/Admin/AddLivreur";
import AddEntreprise from "./Pages/Admin/AddEntreprise";
import Home from "./Pages/Home";
import PrivateRoutes from "./Routes/PrivateRoutes";
import PrivateRoutesUser from "./Routes/PrivateRoutesUser";
import UserDashboard from "./Pages/User/UserDashboard";
import DemandeDemenagements from "./Pages/User/DemandeDemenagements";
import DemandeLivraisons from "./Pages/User/DemandeLivraisons";
import HistoriqueDemenagements from "./Pages/User/HistoriqueDemenagements";
import HistoriqueLivraisons from "./Pages/User/HistoriqueLivraisons";
import { AppStore } from "./Store";
import DemandeDemenagementsAdmin from "./Pages/Admin/DemandeDemenagementsAdmin";
import DemandeLivraisonsAdmin from "./Pages/Admin/DemandeLivraisonsAdmin";
import HistoriqueDemenagementsAdmin from "./Pages/Admin/HistoriqueDemenagementsAdmin";
import HistoriqueLivraisonsAdmin from "./Pages/Admin/HistoriqueLivraisonsAdmin";
import TableauDeBord from "./Pages/Admin/TableauDeBord";
import AdminResponse from "./Pages/Admin/AdminResponse"; 
import NotificationAdmin from "./Pages/Admin/NotificationAdmin";
import NotificationUser from "./Pages/User/NotificationUser";
import UserResponseToAdmin from "./Pages/User/UserResponseToAdmin";
import PrivateRoutesLivreur from "./Routes/PrivateRoutesLivreur";
import AssosiateToLiv from "./Pages/Admin/AssosiateToLiv";
import PrivateRoutesEntreprise from "./Routes/PrivateRoutesEntreprise";
import EntrepriseLogin from "./Pages/Entreprise/EntrepriseLogin";
import EntrepriseDashboard from "./Pages/Entreprise/EntrepriseDashboard";
import EntrepriseDemandeLivraisons from "./Pages/Entreprise/EntrepriseDemandeLivraisons";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("AdminToken");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const lid = localStorage.getItem("livreurId")
    if (token) {
      AppStore.update((s) => {
        s.auth.token = token;
        s.userId = userId;
        s.username = username;
        s.adminToken = adminToken;
        s.livreurId = lid
      });
    }
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Home />} path="/" exact />
          
          <Route element={<PrivateRoutes />} path="/admin">
            <Route element={<Dashboard />} path="dashboard" >
              <Route index element={<Navigate to="/admin/dashboard/tableau-de-bord" />} />
              <Route element={<TableauDeBord/>} path="tableau-de-bord"/>
              <Route index element={<Navigate to="/admin/dashboard/add-livreur" />} />
              <Route element={<AddLivreur />} path="add-livreur" />
              <Route element={<AddEntreprise />} path="add-entreprise" />
              <Route element={<DemandeDemenagementsAdmin />} path="demandes-demenagements-admin" />
              <Route element={<DemandeLivraisonsAdmin />} path="demandes-livraisons-admin" />
              <Route element={<HistoriqueDemenagementsAdmin />} path="historique-demenagements-admin" />
              <Route element={<HistoriqueLivraisonsAdmin />} path="historique-livraisons-admin" />
              <Route element={<NotificationAdmin />} path="notifications-admin" />
              <Route element={<AdminResponse />} path="admin-response/:type/:id" />
              <Route element={<AssosiateToLiv />} path="assosiateToLiv/:id" />
            </Route>
          </Route>
          
          <Route element={<PrivateRoutesUser />} path="/user">
            <Route element={<UserDashboard />} path="dashboard">
              <Route element={<DemandeDemenagements />} path="demandes-demenagements" />
              <Route element={<DemandeLivraisons />} path="demandes-livraisons" />
              <Route element={<HistoriqueDemenagements/>} path="historique-demenagements" />
              <Route element={<HistoriqueLivraisons />} path="historique-livraisons" />
              <Route element={<NotificationUser />} path="notifications-user" />
              <Route element={<UserResponseToAdmin />} path="response/:actionId" />
            </Route>
          </Route>

          <Route element={<PrivateRoutesLivreur />} path="/livreur">
              <Route element={<LivreurDashboard />} path="dashboard" > 
                <Route element={<LivreurDemandeLivraisons />} path="demandes-livraisons-Liv" />
          </Route>
          </Route>

          <Route element={<PrivateRoutesEntreprise/>} path="/entreprise">
              <Route element={<EntrepriseDashboard />} path="dashboard" > 
                <Route element={<EntrepriseDemandeLivraisons />} path="demandes-livraisons-Entreprise" />
          </Route>
          </Route>
          

          <Route element={<Login />} path="/admin/login" />
          <Route element={<UserLogin />} path="/user/login" />
          <Route element={<UserRegister />} path="/user/register" />
          <Route element={<LivreurLogin />} path="/livreur/login" />
          <Route element={<EntrepriseLogin />} path="/entreprise/login" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
