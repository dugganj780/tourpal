import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/privateRoute";
import TourListPage from "./pages/tourListPage";
import PoiListPage from "./pages/poiListPage";
import CreateTourPage from "./pages/createTourPage";
import CreatePoiPage from "./pages/createPoiPage";
import TourDetailsPage from "./pages/tourDetailsPage";
import PoiDetailsPage from "./pages/poiDetailsPage";
import UpdateTourPage from "./pages/updateTourPage";
import UpdatePoiPage from "./pages/updatePoiPage";
import RegistrationPage from "./pages/registrationPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AllToursPage from "./pages/allToursPage";
import UserListPage from "./pages/userListPage";
import AllPoisPage from "./pages/allPoisPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#04A777",
    },
    text: {
      primary: "#04A777",
      secondary: "#05C78D",
      disabled: "#06DB9B",
    },
    background: {
      paper: "#EFEAE6",
      default: "#EFEAE6",
    },
  },
  typography: {},
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/register"
              element={
                <PrivateRoute>
                  <RegistrationPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/tourlist"
              element={
                <PrivateRoute>
                  <TourListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/alltours"
              element={
                <PrivateRoute>
                  <AllToursPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/tour/:tourId"
              element={
                <PrivateRoute>
                  <TourDetailsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/poi/:poiId"
              element={
                <PrivateRoute>
                  <PoiDetailsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/poilist"
              element={
                <PrivateRoute>
                  <PoiListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/poilist/:tourId"
              element={
                <PrivateRoute>
                  <PoiListPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/allpois"
              element={
                <PrivateRoute>
                  <AllPoisPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/createtour"
              element={
                <PrivateRoute>
                  <CreateTourPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/updatetour/:tourId"
              element={
                <PrivateRoute>
                  <UpdateTourPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/updatepoi/:poiId"
              element={
                <PrivateRoute>
                  <UpdatePoiPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/createpoi"
              element={
                <PrivateRoute>
                  <CreatePoiPage />
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/allusers"
              element={
                <PrivateRoute>
                  <UserListPage />
                </PrivateRoute>
              }
            />
            <Route exact path="/" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

reportWebVitals();
ReactDOM.render(<App />, document.getElementById("root"));
