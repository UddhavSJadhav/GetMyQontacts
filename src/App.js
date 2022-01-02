import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Authentication from "./Main Components/Authentication";
import Navbar from "./Main Components/Navbar";
import QuickSearch from "./Main Components/QuickSearch";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<QuickSearch />} exact />
          <Route path='/auth' element={<Authentication />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
