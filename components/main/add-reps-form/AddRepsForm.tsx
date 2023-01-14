import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { Exercise, Set, User } from "@models/models";
import { HiOutlinePlus } from "react-icons/hi";
import { addSets } from "@stores/setStore";
import { useState } from "react";
// import { sendDiscordMessage } from "@lib/discord";
import { toast } from "react-toastify";
import { useFieldArray, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

interface Props {
  exercises: Exercise[];
}

export const AddRepsForm = (props: Props) => {
  const { data: session } = useSession();

  if (!session?.user) {
    return <p>Log in to enter your reps</p>;
  }

  return <Form {...props} user={session.user} />;
};

interface FormProps extends Props {
  user: User;
}

interface PostSet extends Omit<Set, "id" | "createdAt" | "reps" | "user" | "exercise"> {
  reps?: number;
}

export interface PostSetPrisma extends Omit<PostSet, "reps"> {
  reps: number;
}

interface FormData {
  sets: PostSet[];
}

const Form = ({ exercises, user }: FormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const sets: PostSet[] = exercises.map(exercise => ({
    exerciseId: exercise.id,
    userId: user.id
  }));

  const { register, handleSubmit, control, reset, watch } = useForm<FormData>({ 
    defaultValues: {
      sets
    } 
  });

  const { fields } = useFieldArray({ control, name: "sets" });

  const onSubmit = async(data: FormData) => {
    setIsLoading(true);

    const setsToAdd: PostSetPrisma[] = data.sets.filter(set => set.reps && Number(set.reps) > 0).map(set => ({
      ...set,
      reps: Number(set.reps)
    }));

    const response = await fetch("/api/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(setsToAdd)
    });

    const addedSets: Set[] = await response.json();

    addSets(addedSets);
    toast("🔥 Successfully added sets");
    reset();

    setIsLoading(false);
    // sendDiscordMessage(user.name, Number(reps), exercise.name);
  };

  const disableAddButton = !watch().sets.some(set => set.reps && set.reps > 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {fields.map((set, index) => (
            <div className="w-full" key={set.id}>
              <Label
                className="font-semibold"
                htmlFor="rep"
                value={exercises[index].name}
              />
              <TextInput
                id={set.id}
                {...register(`sets.${index}.reps`)}
                placeholder="0"
                type="number"
                disabled={isLoading}
              />
            </div>
          ))}
        </div>
        <Button
          className="w-fit"
          type="submit"
          disabled={disableAddButton}
          gradientDuoTone="purpleToPink"
        >
          Add
          <div className="ml-3">
            {isLoading
              ? <Spinner size="sm" light />
              : <HiOutlinePlus />}
          </div>
        </Button>
      </div>
    </form>
  );
};
