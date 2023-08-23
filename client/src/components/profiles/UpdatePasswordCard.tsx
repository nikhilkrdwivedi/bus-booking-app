import Card from "@components/cards/Card";
import Input from "@elements/Input";
import Button from "@elements/Button";
import { useState } from "react";
import { updatePassword } from "@data/rest/users";
import { toast } from "react-toastify";
import { useTheme } from "@contexts/ThemeContext";
import { useAuth } from "@contexts/AuthContext";
export default function UpdatePasswordCard() {
  const { isDarkMode } = useTheme();
  const { userContext } = useAuth();

  const [passwords, setPasswords] = useState({
    newPassword: "",
    password: "",
  });
  const [passwordsError, setPasswordsError] = useState({
    newPassword: "",
    password: "",
  });
  const validatedRequest = () => {
    const errors: any = {};

    if (!passwords?.password) {
      errors["password"] = "Password is required!";
    }
    if (!passwords?.newPassword) {
      errors["newPassword"] = "New Password is required!";
    }

    setPasswordsError(errors);
    if (!Object.keys(errors).length) {
      updateUserPassword();
    }
  };

  async function updateUserPassword() {
    try {
      const { _id } = userContext;
      await updatePassword(_id, passwords);
      toast("Password updated successfully.", {
        type: "success",
        theme: isDarkMode ? "dark" : "light",
      });
      setPasswords({});
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Try again 🤠";
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
  }
  return (
    <Card
      title={"Update Password"}
      cardClass="bg-gray-200 dark:bg-gray-800 rounded-md"
      headerClass="p-2 text-gray-600 dark:text-gray-200 font-semibold border-b border-gray-400 dark:border-gray-200"
      bodyClass="p-2"
    >
      <div className="">
        <Input
          type="password"
          label="Current Password"
          value={passwords?.password || ""}
          error={passwordsError?.password}
          onChange={(e) =>
            setPasswords({ ...passwords, password: e.target.value })
          }
        />
      </div>
      <div className="">
        <Input
          type="password"
          label="New Password"
          value={passwords?.newPassword || ""}
          error={passwordsError?.newPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
        />
      </div>
      <div className="">
        <Button
          onClick={() => validatedRequest()}
          title={"Update Password"}
          classNames="w-full bg-green-400 p-1.5 hover:bg-green-500 text-sm font-semibold hover:text-gray-200 text-gray-600"
        />
      </div>
    </Card>
  );
}

//
