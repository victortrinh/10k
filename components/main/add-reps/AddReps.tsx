import { User } from "../../../models";
import { AddRep } from "./components/AddRep";

interface Props {
  exerciseId: string;
  users: User[];
}

export const AddReps = ({ exerciseId, users }: Props) => (
  <table className="table-fixed">
    <tbody>
      {users.map((user) => (
        <AddRep key={user.id} user={user} exerciseId={exerciseId} />
      ))}
    </tbody>
  </table>
);
