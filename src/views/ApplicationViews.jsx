import { Outlet, Route, Routes } from "react-router-dom";
import { Authorized } from "../views/Authorized.jsx";
import { Login } from "../components/auth/Login.jsx";
import { Register } from "../components/auth/Register.jsx";
import { NavBar } from "../components/nav/NavBar";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          {/* Component Routes here */}
        </Route>
      </Route>
    </Routes>
  );
};
