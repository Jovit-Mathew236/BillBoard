// import { useState } from 'react'
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  // Navigate,
} from "react-router-dom";
import Display from "./modules/screen/pages/display";
import Admin from "./modules/admin/pages/admin";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Display />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
