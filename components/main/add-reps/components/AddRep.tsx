import { Set } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { Exercise, User } from "../../../../models";
import { UserDisplay } from "../../../UserDisplay";
import { addSet } from "../../../../stores/setStore";

interface Props {
  exercise: Exercise;
  user: User;
}

const sendDiscordMessage = (name: string, reps: number, exercise: string) => {
  const request = new XMLHttpRequest();
  request.open(
    "POST",
    "https://discord.com/api/webhooks/1061005908655751300/bK_v8DFOwm9LYZ65NFjwJVuwnx6JROTaTSAFIz9fgdIDpJPoyD4cdJFBqe4t95vBfs0e"
  );

  request.setRequestHeader("Content-type", "application/json");

  const params = {
    username: "Stay Hard Beast",
    content: `${name} just added ${reps} ${exercise}!`,
  };

  request.send(JSON.stringify(params));
};

export const AddRep = ({ exercise, user }: Props) => {
  const [reps, setReps] = useState("");

  const onChangeReps = (e: ChangeEvent<HTMLInputElement>) => {
    setReps(e.target.value);
  };

  const onAddSet = async (userId: string) => {
    if (Number(reps) === 0) {
      return;
    }

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
    sendDiscordMessage(user.name, Number(reps), exercise.name);
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
