import { Outlet, Link } from "react-router-dom";

function DevLayout() {
  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div className="flex flex-col w-60 p-5 bg-(--bg-light)">
        <h2 className="font-bold mb-4">dev-tools</h2>
        <ul className="flex flex-col gap-2">
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
      <div className="flex p-6 w-full">
        <Outlet />
      </div>
    </div>
  );
}
export default DevLayout;
