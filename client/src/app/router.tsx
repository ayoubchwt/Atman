import { BrowserRouter, Route, Routes } from "react-router-dom";
import DevLayout from "../dev/DevLayout";
import ButtonsSendbox from "../dev/ButtonsSandbox";
import DevHome from "../dev/DevHome";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DevLayout />} />
          <Route path="/dev" element={<DevLayout />}>
            <Route index element={<DevHome />} />
            <Route path="buttons" element={<ButtonsSendbox />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Router;
