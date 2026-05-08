import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/dashboard/pages/Dashboard";
import RestorePassword from "../features/auth/pages/RestorePassword";
import OtpForm from "../features/auth/layout/OtpForm";
import ForgotPasswordForm from "../features/auth/layout/ForgotPasswordForm";
import ResetPasswordForm from "../features/auth/layout/ResetPasswordForm";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot" element={<RestorePassword />}>
              <Route index element={<ForgotPasswordForm />} />
              <Route path="verify" element={<OtpForm />} />
              <Route path="reset" element={<ResetPasswordForm />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Router;
