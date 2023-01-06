// import { ChangeEvent, useState } from "react";
import { User } from "../../models/models";

interface Props {
  user: User;
}

export const TableHeader = ({ user }: Props) => {
  //   const [reps, setReps] = useState("");

  //   const onChangeReps = (e: ChangeEvent<HTMLInputElement>) => {
  //     setReps(e.target.value);
  //   };

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {user.imageUrl && (
        <img src={user.imageUrl} alt={user.name} width="20" height="auto" />
      )}
      {user.name}
      {/* <input
        className="border border-slate-400 rounded px-2 py-1"
        onChange={onChangeReps}
        placeholder="Add reps"
        type="number"
        value={reps}
      /> */}
    </div>
  );
};
