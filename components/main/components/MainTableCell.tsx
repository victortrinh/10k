import { ReactNode } from "react";
import { Table } from "flowbite-react";
import classNames from "classnames";

interface Props {
  centered?: boolean;
  children: ReactNode;
}

export const MainTableCell = ({ centered, children }: Props) => (
  <Table.Cell
    className={classNames(
      "font-bold whitespace-nowrap text-gray-900 dark:text-white",
      centered && "text-center"
    )}
  >
    {children}
  </Table.Cell>
);
