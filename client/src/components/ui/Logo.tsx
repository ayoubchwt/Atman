import logo from "../../assets/pictures/logo.svg";
function Logo() {
  return (
    <div className="flex items-end gap-3">
      <img src={logo} className="w-7"/>
      <h1 className=" text-(--text) text-2xl font-serif font-bold">Atman</h1>
    </div>
  );
}
export default Logo;
