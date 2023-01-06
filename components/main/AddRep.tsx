import { Set } from "@prisma/client";
import Router, { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

interface Props {
  userId: string;
}

export const AddRep = ({ userId }: Props) => {
  const [reps, setReps] = useState(0);
  const router = useRouter();

  const onChangeReps = (e: ChangeEvent<HTMLInputElement>) => {
    setReps(Number(e.target.value));
  };

  const onClick = async (userId: string) => {
    const body: Omit<Set, "id"> = {
      createdAt: new Date(),
      exerciseId: "clcjvxy5z0002ipgoujlq2yx0",
      reps: reps,
      userId,
    };

    await fetch("/api/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setReps(0);
    router.replace(router.asPath);
  };

  return (
    <>
      <input
        className="border border-slate-400 rounded px-2 py-1 w-full"
        onChange={onChangeReps}
        placeholder="Add reps"
        type="number"
        value={reps}
      />
      <button disabled={reps === undefined} onClick={() => onClick(userId)}>
        Add
      </button>
    </>
  );
};