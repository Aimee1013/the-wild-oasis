import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <row>
      <Heading as="h1">Update hotel settings</Heading>;
      <UpdateSettingsForm />
    </row>
  );
}

export default Settings;
