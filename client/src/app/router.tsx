import { BrowserRouter, Route, Routes } from "react-router-dom";
import DevLayout from "../dev/DevLayout";
import ButtonsSendbox from "../dev/ButtonsSandbox";
import DevHome from "../dev/DevHome";
import Dashboard from "../features/dashboard/pages/dashboard";

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
          <Route path="/home" element={<DevLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Router;
