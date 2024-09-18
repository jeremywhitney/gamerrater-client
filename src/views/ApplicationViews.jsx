import { Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "../components/nav/NavBar";
import { Games } from "../components/games/Games.jsx";
import { GameDetails } from "../components/games/GameDetails.jsx";
import { ReviewForm } from "../components/reviews/ReviewForm.jsx";

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
        <Route path="/games/:gameId" element={<GameDetails />} />
        <Route path="/games/:gameId/review" element={<ReviewForm />} />
      </Route>
    </Routes>
  );
};
