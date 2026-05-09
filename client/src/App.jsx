import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import CollegeDetails from "./pages/CollegeDetails";

import Compare from "./pages/Compare";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Saved from "./pages/Saved";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/college/:id"
          element={<CollegeDetails />}
        />

        <Route
          path="/compare"
          element={<Compare />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/saved"
          element={<Saved />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;