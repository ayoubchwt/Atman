import SettingsBody from "../layout/SettingsBody";
import SettingsHeader from "../layout/SettingsHeader";
function Settings() {
  return (
    <div className="flex flex-col w-full h-full">
      <SettingsHeader></SettingsHeader>
      <SettingsBody></SettingsBody>
    </div>
  );
}
export default Settings;
