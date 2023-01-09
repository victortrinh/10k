import { Table } from "flowbite-react";
import { Exercise, User } from "../../../models";
import { AddRep } from "./components/AddRep";

interface Props {
  exercise: Exercise;
  users: User[];
}

export const AddReps = ({ exercise, users }: Props) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-2">
    {users.map((user) => (
      <AddRep key={user.id} user={user} exercise={exercise} />
    ))}
  </div>
);
