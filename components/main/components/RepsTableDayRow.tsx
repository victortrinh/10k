import { Set } from "@models/models";
import { Table } from "flowbite-react";
import { groupBy } from "lodash";
import { useMemo } from "react";
import classNames from "classnames";

interface Props {
  userId: string;
  sets: Set[];
}

export const RepsTableDayRow = ({ userId, sets }: Props) => {
  const totalForDayForUser = sets
    .filter((set) => set.userId === userId)
    .map((set) => set.reps)
    .reduce((a, b) => a + b, 0);

  const ranking = useMemo(() => {
    const setsPerUserForDay: Set[][] = Object.values(groupBy(sets, (set) => set.userId));
    const sortedSets = setsPerUserForDay
      .map((setByUser) => ({
        userId: setByUser[0].userId,
        reps: setByUser.map((set) => set.reps).reduce((a, b) => a + b, 0)
      }))
      .sort((a, b) => b.reps - a.reps);

    const index = sortedSets.findIndex((set) => set.userId === userId);

    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return undefined;
    }
  }, [sets, userId]);

  return (
    <Table.Cell
      className={classNames(
        "text-center",
        ranking && "text-black dark:text-white"
      )}
    >
      {totalForDayForUser} 
      {" "}
      {ranking}
    </Table.Cell>
  );
};
