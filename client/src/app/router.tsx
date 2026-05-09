import {
  // BrowserRouter,
  createBrowserRouter,
  // Route,
  RouterProvider,
  // Routes,
} from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/dashboard/pages/Dashboard";
import RestorePassword from "../features/auth/pages/RestorePassword";
import OtpForm from "../features/auth/layout/OtpForm";
import ForgotPasswordForm from "../features/auth/layout/ForgotPasswordForm";
import ResetPasswordForm from "../features/auth/layout/ResetPasswordForm";
import Settings from "../features/settings/pages/Settings";
import { appLoader } from "../loaders/appLoader";
import { settingsLoader } from "../loaders/settingsLoader";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        loader: appLoader,
        element: <Dashboard />,
      },
      {
        path: "home",
        loader: appLoader,
        element: <Dashboard />,
      },
      {
        path: "settings",
        loader: settingsLoader,
        element: <Settings />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot",
        element: <RestorePassword />,
        children: [
          {
            index: true,
            element: <ForgotPasswordForm />,
          },
          {
            path: "verify",
            element: <OtpForm />,
          },
          {
            path: "reset",
            element: <ResetPasswordForm />,
          },
        ],
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router}></RouterProvider>;
  // return (
  //   <>
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<Dashboard />} />
  //         <Route path="/home" element={<Dashboard />} />
  //         <Route path="/settings" element={<Settings />} />
  //         <Route path="/auth">
  //           <Route path="login" element={<Login />} />
  //           <Route path="register" element={<Register />} />
  //           <Route path="forgot" element={<RestorePassword />}>
  //             <Route index element={<ForgotPasswordForm />} />
  //             <Route path="verify" element={<OtpForm />} />
  //             <Route path="reset" element={<ResetPasswordForm />}></Route>
  //           </Route>
  //         </Route>
  //       </Routes>
  //     </BrowserRouter>
  //   </>
  // );
}
export default Router;
