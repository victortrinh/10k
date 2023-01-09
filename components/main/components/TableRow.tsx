import { ReactNode } from "react";
import { Table } from "flowbite-react";

interface Props {
  children: ReactNode;
}

export const TableRow = ({ children }: Props) => (
  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
    {children}
  </Table.Row>
);
