import { BrowserRouter, Route, Routes } from "react-router-dom";
import DevLayout from "../dev/DevLayout";
import ButtonsSendbox from "../dev/ButtonsSandbox";
import DevHome from "../dev/DevHome";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/dashboard/pages/Dashboard";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dev" element={<DevLayout />}>
            <Route index element={<DevHome />} />
            <Route path="buttons" element={<ButtonsSendbox />} />
          </Route>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Router;
