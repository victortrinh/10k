import { BeautifulCard } from "@components/design-system/BeautifulCard";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { Exercise, Set, User } from "@models/models";
import { Heading } from "@components/design-system";
import { HiOutlinePlus } from "react-icons/hi";
import { addSets } from "@stores/setStore";
import { motion, useAnimation } from "framer-motion";
import { sendDiscordMessage } from "@lib/discord";
import { toast } from "react-toastify";
import { useFieldArray, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Props {
  exercises: Exercise[];
}

export const AddRepsForm = (props: Props) => {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <div className="w-full flex justify-center">
        {status === "loading"
          ? <Spinner size="xl"  />
          : <div className="w-full text-center"><Heading as="h3">Log in to enter your reps</Heading></div>}
      </div>
    );
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
  const controls = useAnimation();
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
    sendDiscordMessage(`${user.name} just did ${addedSets.map(set => `${set.reps} ${set.exercise.name.toLowerCase()}`).join(", ").replace(/, ((?:.(?!, ))+)$/, " and $1")}`);
  };

  const disableAddButton = !watch().sets.some(set => set.reps && set.reps > 0);

  return (
    <div className="w-full flex justify-center">
      <BeautifulCard className="w-full max-w-[400px] p-3">
        <Heading as="h2">
          Enter reps
        </Heading>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            {fields.map((set, index) => (
              <div className="w-full" key={set.id}>
                <Label
                  className="font-bold"
                  htmlFor="rep"
                  value={exercises[index].name}
                />
                <TextInput
                  id={set.id}
                  className="mt-2"
                  {...register(`sets.${index}.reps`)}
                  placeholder="0"
                  type="number"
                  disabled={isLoading}
                />
              </div>
            ))}
            <motion.div
              whileHover={!disableAddButton
                ? { 
                  rotate: [-7, 0 , 7],
                  scale: 1.1,
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.2
                  } }
                : {}}
              whileTap={!disableAddButton
                ? { scale: 0.9 }
                : {}}
              className="w-full"
            >
              <Button
                onMouseEnter={() => controls.start("start")}
                className="mt-6 font-extrabold w-full"
                size="lg"
                type="submit"
                disabled={disableAddButton}
                gradientDuoTone="pinkToOrange"
              >
                Add
                <div className="ml-3">
                  {isLoading
                    ? <Spinner size="sm" light />
                    : <HiOutlinePlus />}
                </div>
              </Button>
            </motion.div>
          </div>
        </form>
      </BeautifulCard>
    </div>
  );
};
