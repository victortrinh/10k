import { format } from "date-fns";
import { Table } from "flowbite-react";
import { User } from "../../../models";
import { TableRow } from "./TableRow";
import { MainTableCell } from "./MainTableCell";

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
