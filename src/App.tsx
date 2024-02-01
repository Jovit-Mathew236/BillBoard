// import { useState } from 'react'
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  // Navigate,
} from "react-router-dom";
import Display from "./modules/screen/pages/display";

function App() {
  const router = createBrowserRouter([
    {
      path: "display",
      element: <Display />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
