import { User } from "@models/models";
import { useMemo } from "react";
import Image from "next/image";
import classNames from "classnames";

export type Ranking = "gold" | "silver" | "bronze";

interface Props {
  user: User;
  showName?: boolean;
  centered?: boolean;
  rank?: Ranking;
  size?: number;
  className?: string;
}

export const UserDisplay = ({ rank, user, showName, centered, className, size = 40 }: Props) => {
  const custom = useMemo(() => {
    switch (rank) {
      case "gold":
        return {
          color: "!ring-yellow-400",
          icon: "🥇"
        };
      case "silver":
        return {
          color: "!ring-gray-300",
          icon: "🥈"
        };
      case "bronze":
        return {
          color: "!ring-yellow-600",
          icon: "🥉"
        };
      default:
        return undefined;
    }
  }, [rank]);

  const medal = useMemo(() => {
    if (!custom) {
      return null;
    }

    if (size <= 40) {
      return       (
        <div
          className={`absolute -top-1 -right-1 rounded-full ring-2 w-4 h-4 ${custom.color} flex items-center justify-center bg-white dark:bg-background`}
        >
          {custom.icon}
        </div>
      );
    }

    return (
      <div
        className={`absolute -top-1 -right-1 rounded-full ring-2 w-8 h-8 ${custom.color} flex items-center justify-center bg-white dark:bg-background`}
      >
        {custom.icon}
      </div>
    );
  }, [custom]);

  const src = user.imageUrl ?? user.image;

  return (
    <div
      className={classNames(
        "flex items-center gap-3",
        centered && "justify-center",
        className
      )}
    >
      <div className="relative w-fit">
        {src && (
          <Image
            className={classNames(
              `p-1 rounded-full ring-2 ring-${user.color}-500 dark:ring-${user.color}-200`,
              custom?.color
            )}
            width={size}
            height={size}
            src={src}
            alt={user.name}
          />
        )}
        {medal}
      </div>
      {showName && (
        <div className="hidden md:block font-medium dark:text-white">
          {user.name}
        </div>
      )}
    </div>
  );
};
