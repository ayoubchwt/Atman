import Switch from "react-switch";
function ToggleInput({
  onChange,
  checked,
}: {
  onChange: () => void;
  checked: boolean;
}) {
  return (
    <div>
      <Switch onChange={onChange} checked={checked}></Switch>
    </div>
  );
}
export default ToggleInput;
