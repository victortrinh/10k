// import { ChangeEvent, useState } from "react";
import { Avatar } from "flowbite-react";
import { User } from "../models/models";
import classNames from "classnames";

interface Props {
  user: User;
  showName?: boolean;
  centered?: boolean;
}

export const UserDisplay = ({ user, showName, centered }: Props) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-3",
        centered && "justify-center"
      )}
    >
      <img
        className={`w-10 h-10 p-1 rounded-full ring-2 ring-[${user.color}]`}
        src={user.imageUrl}
        alt={user.name}
      />
      {showName && (
        <div className="font-medium dark:text-white">{user.name}</div>
      )}
    </div>
  );
};
