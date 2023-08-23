import { ReactNode } from "react";

export default function TableRow({ children }: TableRow) {
  return (
    <tr className="border-b dark:border-neutral-500 text-gray-800 dark:text-gray-200">
      {children}
    </tr>
  );
}
type TableRow = {
  children: ReactNode;
};
