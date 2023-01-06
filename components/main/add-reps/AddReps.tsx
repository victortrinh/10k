import { User } from "../../../models";
import { AddRep } from "./components/AddRep";

interface Props {
  users: User[];
}

export const AddReps = ({ users }: Props) => (
  <table className="table-fixed">
    <tbody>
      {users.map((user) => (
        <AddRep key={user.id} user={user} />
      ))}
    </tbody>
  </table>
);
