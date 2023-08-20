import Container from "@components/containers/Container";
import SignIn from "@components/authentications/SignIn";
import { useState } from "react";
import SignUp from "@components/authentications/SignUp";
// import ThemeSwitch from "@components/themes/ThemeSwitch";
import { register, signIn } from "@data/rest/authentication";
// import { useTheme } from "@contexts/ThemeContext";
import { toast } from "react-toastify";
// import useAuthentication from "@hooks/useAuthentication";
// import { setLocalStorage } from "@utils/manageLocalStorage";
import { useNavigate } from "react-router-dom";
import Button from "@elements/Button";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { setLocalStorage } from "@utils/manageLocalStorage";
import { useAuth } from "@contexts/AuthContext";
// import { forceReloadPage } from "@helpers/reload";

export default function GetStarted() {
//   const { isDarkMode } = useTheme();
  const { setIsAuthenticated, setUserContext } =
    useAuth();
  const navigate = useNavigate();
  const [renderSignInForm, setRenderSignInForm] = useState(true);
  const [form, setForm] = useState<any>({
    // 'pankaj.dwivedi@gmail.com',
    email: "authornikhildwivedi@gmail.com",
    password: "Nikhil123.@", //"Pankaj123.@",
  });

  const [formErrors, setFormErrors] = useState({});

  const toggleFormType = () => {
    setForm({});
    setFormErrors({});
    setRenderSignInForm(!renderSignInForm);
  };
  const validatedRequest = () => {
    const errors:any = {};
    if (!renderSignInForm && !form?.name) {
      errors["name"] = "Name is required field!";
    }
    if (!form?.email) {
      errors["email"] = "Email is required field!";
    }
    if (!form?.password) {
      errors["password"] = "Password is required field!";
    }
    setFormErrors(errors);
    if (!Object.keys(errors).length) {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    try {
      const call = renderSignInForm ? signIn : register;
      const {
        data: { data },
      } = await call(form);
      await setLocalStorage({
        userCtx: JSON.stringify(data?.user),
        token: data?.token,
      });
      setUserContext(data?.user); 
      setIsAuthenticated(true)
      

    //   setIsAuthenticatedAndUserContext({
    //     userCtx: data?.user,
    //     token: data?.token,
    //   });
    //   setUserContext(data);
      toast("Great news! You can use your services now 😃", {
        type: "success",
        theme: "isDarkMode" ? "dark" : "light",
      });
      navigate("/");
      /**
       * Need to find better approach to handle this
       */
    //   forceReloadPage();
    } catch (error:any) {
      const errorMsg = error?.response?.data?.message || "Try again 🤠";
      toast(errorMsg, {
        type: "error",
        theme: "isDarkMode" ? "dark" : "light",
      });
    }}
  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-900">
      <Button
        onClick={() => {
          navigate("/");
        }}
        btnClass="!fixed top-0 left-0 m-4 md:m-12 bg-gray-200 dark:bg-gray-800 h-[34px] w-[34px] text-gray-400 dark:text-gray-600  "
        Icon={IoReturnUpBackOutline}
        IconSize={28}
      />
      {/* <ThemeSwitch themeSwitchClass="!fixed top-0 right-0 m-4 md:m-12" /> */}

      <Container className="flex-1 dark:bg-gray-900">
        {renderSignInForm ? (
          <SignIn
            onChange={(value: string, key:string) => {
              setForm((prev:any) => ({ ...prev, [key]: value }));
            }}
            dataErrors={formErrors}
            data={form}
            changeFormType={() => {
              toggleFormType();
            }}
            submitForm={() => validatedRequest()}
          />
        ) : (
          <SignUp
            onChange={(value:string, key:string) => {
              setForm((prev:any) => ({ ...prev, [key]: value }));
            }}
            dataErrors={formErrors}
            data={form}
            changeFormType={() => {
              toggleFormType();
            }}
            submitForm={() => validatedRequest()}
          />
        )}
      </Container>
    </div>
  );
}
function useAuthentication(): { setUserContext: any; setIsAuthenticatedAndUserContext: any; } {
    throw new Error("Function not implemented.");
}

