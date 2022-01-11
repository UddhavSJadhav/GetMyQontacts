import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Authentication from "./Main Components/Authentication";
import Contacts from "./Main Components/Contacts";
import Navbar from "./Main Components/Navbar";
import QuickSearch from "./Main Components/QuickSearch";
import { UserContext } from "./Utils/AuthAtApp";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      const localToken = localStorage.getItem("userToken");
      if (!localToken) return;
      await axios
        .post("http://localhost:5000/authentication/checktoken", {
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
          <Navbar />
          <Routes>
            <Route path='/' element={<QuickSearch />} exact />
            <Route path='/auth' element={<Authentication />} exact />
            <Route path='/contacts' element={<Contacts />} exact />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
