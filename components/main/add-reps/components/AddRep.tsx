import { Set } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { Exercise, User } from "../../../../models";
import { UserDisplay } from "../../../UserDisplay";
import { addSet } from "../../../../stores/setStore";

interface Props {
  exercise: Exercise;
  user: User;
}

export const AddRep = ({ exercise, user }: Props) => {
  const [reps, setReps] = useState("");

  const onChangeReps = (e: ChangeEvent<HTMLInputElement>) => {
    setReps(e.target.value);
  };

  const onAddSet = async (userId: string) => {
    const body: Omit<Set, "id"> = {
      createdAt: new Date(),
      exerciseId: exercise.id,
      reps: Number(reps),
      userId,
    };

    const response = await fetch("/api/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const newSet = await response.json();

    setReps("");
    addSet(newSet);
  };

  return (
    <tr>
      <td className="pr-3">
        <UserDisplay user={user} />
      </td>
      <td>
        <input
          className="border border-slate-400 rounded px-2 py-1 mr-2"
          onChange={onChangeReps}
          placeholder="Number of reps"
          type="number"
          value={reps}
        />
        <button onClick={() => onAddSet(user.id)} type="submit">
          Add
        </button>
      </td>
    </tr>
  );
};
