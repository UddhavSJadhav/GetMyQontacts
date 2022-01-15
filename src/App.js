import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Authentication from "./Main Components/Authentication";
import Contacts from "./Main Components/Contacts";
import Navbar from "./Main Components/Navbar";
import QuickSearch from "./Main Components/QuickSearch";
import { UserContext } from "./Utils/AuthAtApp";
import { DeleteModalContext, EditModalContext } from "./Utils/ModalContext";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ data: "", deleted: {} });
  const [editModal, setEditModal] = useState({
    data: "",
    newData: "",
    updated: {},
  });
  useEffect(() => {
    async function getUser() {
      const localToken = localStorage.getItem("userToken");
      if (!localToken) return;
      await axios
        .post("https://gmqapi.herokuapp.com/authentication/checktoken", {
          token: localToken,
        })
        .then((res) => {
          setUser({ token: localToken });
        })
        .catch((err) => {
          // console.log(err);
        });
    }
    getUser();
  }, []);
  return (
    <div>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <DeleteModalContext.Provider value={{ deleteModal, setDeleteModal }}>
            <EditModalContext.Provider value={{ editModal, setEditModal }}>
              <Navbar />
              <Routes>
                <Route path='/' element={<QuickSearch />} exact />
                <Route path='/auth' element={<Authentication />} exact />
                <Route path='/contacts' element={<Contacts />} exact />
              </Routes>
            </EditModalContext.Provider>
          </DeleteModalContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
