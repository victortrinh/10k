// import { ChangeEvent, useState } from "react";
import { User } from "../models/models";

interface Props {
  user: User;
}

export const UserDisplay = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {user.imageUrl && (
        <img src={user.imageUrl} alt={user.name} width="20" height="auto" />
      )}
      {user.name}
    </div>
  );
};
