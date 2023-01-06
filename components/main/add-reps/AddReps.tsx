import { Exercise, User } from "../../../models";
import { AddRep } from "./components/AddRep";

interface Props {
  exercise: Exercise;
  users: User[];
}

export const AddReps = ({ exercise, users }: Props) => (
  <table className="table-fixed">
    <tbody>
      {users.map((user) => (
        <AddRep key={user.id} user={user} exercise={exercise} />
      ))}
    </tbody>
  </table>
);
