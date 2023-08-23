/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@components/cards/Card";
import Input from "@elements/Input";
import Button from "@elements/Button";
import { useEffect, useState } from "react";
import { updateUser } from "@data/rest/users";
import { toast } from "react-toastify";
import { useTheme } from "@contexts/ThemeContext";
import { useAuth } from "@contexts/AuthContext";
export default function ProfileCard() {
  const { isDarkMode } = useTheme();
  const { userContext } = useAuth();

  const [form, setForm] = useState({
    name: userContext?.name,
    email: userContext?.email,
  });
  const [formError, setFormError] = useState({
    name: "",
  });
  useEffect(() => {
    setForm(userContext);
  }, [userContext]);

  const validatedRequest = () => {
    const errors: any = {};
    if (!form?.name) {
      errors["name"] = "Name is required!";
    }
    setFormError(errors);
    if (!Object.keys(errors).length) {
      updateUserProfile();
    }
  };

  async function updateUserProfile() {
    try {
      const { _id } = userContext;
      await updateUser(_id, form);
      toast("Profile updated successfully.", {
        type: "success",
        theme: isDarkMode ? "dark" : "light",
      });
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Try again 🤠";
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
  }
  return (
    <Card cardClass="bg-gray-200 dark:bg-gray-800 rounded-md" bodyClass="p-2">
      <div className="">
        <Input
          type="text"
          label="Your Name"
          value={form?.name}
          error={formError?.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="">
        <Input
          type="text"
          disabled
          label="Your Email"
          value={form?.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="">
        <Button
          title={"Update Profile"}
          onClick={() => validatedRequest()}
          classNames="w-full bg-green-400 p-1.5 hover:bg-green-500 text-sm font-semibold hover:text-gray-200 text-gray-600"
        />
      </div>
    </Card>
  );
}

ProfileCard.propTypes = {};

ProfileCard.defaultProps = {};
