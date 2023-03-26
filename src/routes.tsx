import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Form from "./pages/form";
import List from "./pages/list";

const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
  {
    path: "/form",
    element: <Form />,
  },
]);

export default router;
