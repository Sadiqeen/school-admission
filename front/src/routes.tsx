import { createBrowserRouter } from "react-router-dom";
import { PATH } from "./constants/path";

// Component
import Index from "./pages/Index";
import Course from "./pages/Course";
import ErrorPage from "./pages/Error/ErrorPages";
import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";

const routers = createBrowserRouter([
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
  {
    path: PATH.Logout,
    element: <Logout />,
  },

  // Auth
  {
    path: PATH.DASHBOARD,
    element: <Index />,
  },
  {
    path: PATH.COURSE,
    element: <Course />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default routers;