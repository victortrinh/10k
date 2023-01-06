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

  const sendDiscordMessage = (name: string, reps: number, exercise: string) => {
    const request = new XMLHttpRequest();
    request.open(
      "POST",
      `https://discord.com/api/webhooks/${process.env.DISCORD_USERNAME}/${process.env.DISCORD_SECRET}`
    );

    request.setRequestHeader("Content-type", "application/json");

    const params = {
      username: "Stay Hard Beast",
      content: `${name} just did ${reps} ${exercise}! Keep up you scrub!`,
    };

    request.send(JSON.stringify(params));
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
