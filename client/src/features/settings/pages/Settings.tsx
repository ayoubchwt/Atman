import ErrorBanner from "../../../components/ui/ErrorBanner";
import { useErrorStore } from "../../../store/useErrorStore";
import SettingsBody from "../layout/SettingsBody";
import SettingsHeader from "../layout/SettingsHeader";
function Settings() {
  const { error } = useErrorStore();
  return (
    <div className="relative flex flex-col w-full h-full">
      <SettingsHeader></SettingsHeader>
      <SettingsBody></SettingsBody>
      {error && <ErrorBanner></ErrorBanner>}
    </div>
  );
}
export default Settings;
