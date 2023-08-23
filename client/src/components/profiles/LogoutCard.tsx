import Card from "@components/cards/Card";
import Button from "@elements/Button";
import { useAuth } from "@contexts/AuthContext";

export default function LogoutCard({ logoutClick }: LogoutCardType) {
  const { userContext } = useAuth();
  console.log({ userContext });
  return (
    <Card
      title={"Security"}
      cardClass="bg-gray-200 dark:bg-gray-800 rounded-md"
      headerClass="p-2 text-gray-600 dark:text-gray-200 font-semibold border-b border-gray-400 dark:border-gray-200"
      bodyClass="p-2"
    >
      <div className="py-1"></div>
      <div className="">
        <Button
          onClick={logoutClick}
          title={"Logout from all devices"}
          classNames="w-full bg-green-400 p-1.5 hover:bg-green-500 text-sm font-semibold hover:text-gray-200 text-gray-600"
        />
      </div>
    </Card>
  );
}

type LogoutCardType = {
  logoutClick: () => void;
};
