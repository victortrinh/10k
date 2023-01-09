import { MainTableCell } from "./MainTableCell";
import { Table } from "flowbite-react";
import { TableRow } from "./TableRow";
import { User } from "@models/";
import { format } from "date-fns";

interface Props {
  users: User[];
}

export const NoneTodayRow = ({ users }: Props) => (
  <TableRow>
    <MainTableCell>{format(new Date(), "MMM d")}</MainTableCell>
    {users.map((user) => (
      <Table.Cell className="text-center" key={user.id}>
        0
      </Table.Cell>
    ))}
  </TableRow>
);
