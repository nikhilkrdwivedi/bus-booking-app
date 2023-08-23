/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@elements/Input";
import Button from "@elements/Button";

export default function SignIn({
  changeFormType,
  data,
  dataErrors,
  onChange,
  submitForm,
}: SignInType) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-8 px-4">
      <div className="text-gray-600 dark:text-gray-200 text-2xl font-bold">
        Sign In Here
      </div>
      <div className="text-gray-600 dark:text-gray-200 text-base text-center px-4 w-full md:w-2/3 lg:w-1/3">
        Sign In: Knock, knock. Who&apos;s there? Just your data, waiting to be
        signed in.
      </div>
      <div
        className="flex flex-col gap-1 
        py-4 px-4 md:p-4 w-full md:w-2/3 lg:w-1/3  
        rounded-md shadow-md dark:shadow-gray-600 shadow-gray-300 dark:bg-gray-800 bg-gray-100"
      >
        <Input
          type="text"
          placeholder="Enter Email"
          label="Email*"
          value={data?.email || ""}
          error={dataErrors?.email || ""}
          onChange={(e: any) => onChange(e.target.value, "email")}
        />
        <Input
          placeholder="Enter Password"
          label="Password*"
          type="password"
          value={data?.password || ""}
          error={dataErrors?.password || ""}
          onChange={(e: any) => onChange(e.target.value, "password")}
        />
        <Button
          title={"Sign In"}
          classNames="!w-full bg-green-500 p-2 text-white font-semibold text-md"
          onClick={submitForm}
        />
      </div>
      <div
        className="text-gray-600 dark:text-gray-200 text-md font-semibold underline m-2 cursor-pointer"
        onClick={changeFormType}
      >
        Don&apos;t have an account?
      </div>
    </div>
  );
}

type SignInType = {
  changeFormType?: () => void;
  data?: any;
  dataErrors?: any;
  onChange: (arg0: string, arg1: string) => void;
  submitForm?: () => void;
};
