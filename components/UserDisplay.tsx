// import { ChangeEvent, useState } from "react";
import { Avatar } from "flowbite-react";
import { User } from "../models/models";
import classNames from "classnames";
import { useMemo } from "react";

export type Ranking = "gold" | "silver" | "bronze";

interface Props {
  user: User;
  showName?: boolean;
  centered?: boolean;
  rank?: Ranking;
}

export const UserDisplay = ({ rank, user, showName, centered }: Props) => {
  const custom = useMemo(() => {
    switch (rank) {
      case "gold":
        return {
          color: "!ring-yellow-400",
          icon: "🥇",
        };
      case "silver":
        return {
          color: "!ring-gray-300",
          icon: "🥈",
        };
      case "bronze":
        return {
          color: "!ring-yellow-600",
          icon: "🥉",
        };
      default:
        return undefined;
    }
  }, [rank]);

  return (
    <div
      className={classNames(
        "flex items-center gap-3",
        centered && "justify-center"
      )}
    >
      <div className="relative w-fit">
        <img
          className={classNames(
            `w-10 h-10 p-1 rounded-full ring-2 ring-${user.color}`,
            custom?.color
          )}
          src={user.imageUrl}
          alt={user.name}
        />
        {custom && (
          <div
            className={`absolute -top-1 -right-1 rounded-full ring-2 w-4 h-4 ${custom.color} flex items-center justify-center bg-white dark:bg-background`}
          >
            {custom.icon}
          </div>
        )}
      </div>

      {showName && (
        <div className="hidden md:block font-medium dark:text-white">
          {user.name}
        </div>
      )}
    </div>
  );
};
