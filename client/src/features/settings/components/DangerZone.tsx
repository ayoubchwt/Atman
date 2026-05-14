import { CircleAlert } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Button from "../../../components/ui/Button";
import { useDangerZoneSettings } from "../hooks/useDangerZoneSettings";
import SettingsOtp from "./SettingsOtp";

function DangerZone() {
  const { otpVisible, setOtp, otp, handleDelete } = useDangerZoneSettings();
  return (
    <div className="flex flex-col gap-5 items-start p-4 bg-(--bg-dark) rounded-md w-full md:w-2xl">
      <SectionHeader
        title="Danger Zone"
        description="Irreversible actions on your account"
        icon={<CircleAlert />}
      ></SectionHeader>
      {otpVisible && (
        <SettingsOtp
          code={otp}
          setCode={setOtp}
          message="An email that contains a verification code has been sent to your email address"
        ></SettingsOtp>
      )}
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center justify-between w-full">
        <div className="flex flex-col">
          <h1 className="text-md font-semibold text-(--text)">
            Delete Account
          </h1>
          <p className="text-xs text-(--text-light)">
            Permanently delete your account and all your notes
          </p>
        </div>
        <Button variant="danger" onClick={handleDelete}>
          {otpVisible ? "Confirm Deletion" : "Delete Account"}
        </Button>
      </div>
    </div>
  );
}
export default DangerZone;
