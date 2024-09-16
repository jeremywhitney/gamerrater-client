import { Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { Games } from "../components/games/Games.jsx";
import { useState } from "react";

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
        <Route path="/games" element={<Games />} />
      </Route>
    </Routes>
  );
};
