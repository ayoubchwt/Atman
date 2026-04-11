import { Outlet, Link } from "react-router-dom";

function DevLayout() {
  return (
    <div className="flex">
      <div className=" flex flex-col w-60 p-5">
        <h2 className="font-bold mb-4"> dev-tools</h2>
        <ul className="gap-2">
          <li>
            <Link to="/dev">Home</Link>
          </li>
          <li>
            <Link to="/dev/buttons">Buttons</Link>
          </li>
          <li>
            <Link to="/dev/inputs">Inputs</Link>
          </li>
          <li>
            <Link to="/dev/editors">Editors</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center p-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
export default DevLayout;
