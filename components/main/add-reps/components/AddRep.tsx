import { Set } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { Exercise, User } from "../../../../models";
import { UserDisplay } from "../../../UserDisplay";
import { addSet } from "../../../../stores/setStore";
import { Button, Spinner, TextInput } from "flowbite-react";

interface Props {
  exercise: Exercise;
  user: User;
}

export const AddRep = ({ exercise, user }: Props) => {
  const [reps, setReps] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const disableAddButton = Number(reps) === 0;

  const onAddSet = async (userId: string) => {
    const body: Omit<Set, "id"> = {
      createdAt: new Date(),
      exerciseId: exercise.id,
      reps: Number(reps),
      userId,
    };

    setIsLoading(true);
    const response = await fetch("/api/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setIsLoading(false);

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
      <td className="flex items-center gap-2">
        <TextInput
          onChange={onChangeReps}
          placeholder="Number of reps"
          value={reps}
          type="number"
          disabled={isLoading}
        />
        <Button
          disabled={disableAddButton}
          gradientDuoTone="purpleToPink"
          onClick={() => onAddSet(user.id)}
        >
          Add
          {isLoading && (
            <div className="ml-3">
              <Spinner size="sm" light={true} />{" "}
            </div>
          )}
        </Button>
      </td>
    </tr>
  );
};
