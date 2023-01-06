import { Set } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { User } from "../../../../models";
import { UserDisplay } from "../../../UserDisplay";
import { addSet } from "../../../../stores/setStore";

interface Props {
  user: User;
}

export const AddRep = ({ user }: Props) => {
  const [reps, setReps] = useState(0);

  const onChangeReps = (e: ChangeEvent<HTMLInputElement>) => {
    setReps(Number(e.target.value));
  };

  const onAddSet = async (userId: string) => {
    const body: Omit<Set, "id"> = {
      createdAt: new Date(),
      exerciseId: "clcjvxy5z0002ipgoujlq2yx0",
      reps: reps,
      userId,
    };

    const response = await fetch("/api/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const newSet = await response.json();

    setReps(0);
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
          placeholder="Add reps"
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
