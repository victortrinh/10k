import { Table } from "flowbite-react";
import { Exercise, User } from "../../../models";
import { AddRep } from "./components/AddRep";

interface Props {
  exercise: Exercise;
  users: User[];
}

export const AddReps = ({ exercise, users }: Props) => (
  <div className="flex flex-col gap-2">
    {users.map((user) => (
      <AddRep key={user.id} user={user} exercise={exercise} />
    ))}
  </div>
);
