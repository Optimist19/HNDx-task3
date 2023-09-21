import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import SignUp from "./Pages/SIgnUp.jsx";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />//<RequireAuth><Home /></RequireAuth>
//   },
//   {
//     path: "/signup",
//     element: <SignUp />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   }
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>
);
