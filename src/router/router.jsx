import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import User from "../pages/User";
import Layout from "../layout/layout";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        element: <PrivateRoute />, // Cette route englobe les routes privées
        children: [
          {
            path: "/user",
            element: <User />,
          },
        ],
      },
    ],
  },
]);

export default router;
