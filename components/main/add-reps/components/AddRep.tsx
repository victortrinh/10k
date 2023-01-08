import { Set } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { Exercise, User } from "../../../../models";
import { UserDisplay } from "../../../UserDisplay";
import { addSet } from "../../../../stores/setStore";
import { Button, Spinner, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import { sendDiscordMessage } from "../../../../lib/discord";

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

    const newSet = await response.json();

    addSet(newSet);
    toast(`🔥 Successfully added ${reps} of ${exercise.name}`);
    setIsLoading(false);
    setReps("");
    sendDiscordMessage(user.name, Number(reps), exercise.name);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 md:w-32">
        <UserDisplay user={user} showName />
      </div>
      <TextInput
        className="w-28"
        onChange={onChangeReps}
        placeholder={`# of ${exercise.name.toLowerCase()}`}
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
    </div>
  );
};
