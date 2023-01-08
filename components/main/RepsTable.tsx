import { format, isToday } from "date-fns";
import { Set, User } from "../../models/models";
import { Ranking, UserDisplay } from "../UserDisplay";
import { groupBy } from "lodash";
import { useSetStore } from "../../stores/setStore";
import { Table } from "flowbite-react";
import { RepsTableDayRow } from "./components/RepsTableDayRow";
import { TableRow } from "./components/TableRow";
import { MainTableCell } from "./components/MainTableCell";
import { NoneTodayRow } from "./components/NoneTodayRow";
import { TotalRow } from "./components/TotalRow";

interface Props {
  exerciseId?: string;
  users: User[];
}

export const RepsTable = ({ exerciseId, users }: Props) => {
  const sets = useSetStore((state) => state.sets);
  const filteredSets = sets.filter((set) => {
    if (!exerciseId) {
      return true;
    }

    return set.exerciseId === exerciseId;
  });

  const days: Set[][] = groupBy(filteredSets, (set) =>
    format(new Date(set.createdAt), "dd MMM")
  );

  const setsByUser: Set[][] = groupBy(filteredSets, (set) => set.userId);
  const totalRepsByUser = Object.values(setsByUser)
    .map((setByUser) => ({
      ...setByUser[0],
      reps: setByUser.map((set) => set.reps).reduce((a, b) => a + b, 0),
    }))
    .sort((a, b) => b.reps - a.reps);
  const totalRankingByUser = totalRepsByUser.map((set) => set.userId);

  const noneToday = !filteredSets.some((set) =>
    isToday(new Date(set.createdAt))
  );

  function getTotalRankingByUserId(userId: string): Ranking | undefined {
    const index = totalRankingByUser.findIndex((u) => u === userId);

    switch (index) {
      case 0:
        return "gold";
      case 1:
        return "silver";
      case 2:
        return "bronze";
      default:
        return undefined;
    }
  }

  const sortedUsers = users
    .map((user) => ({
      ...user,
      reps: user.sets
        .filter((set) => {
          if (!exerciseId) {
            return true;
          }

          return set.exercise.id === exerciseId;
        })
        .flatMap((set) => set.reps)
        .reduce((a, b) => a + b, 0),
    }))
    .sort((a, b) => b.reps - a.reps);

  return (
    <div className="overflow-x-auto max-w-full">
      <Table className="min-w-[900px] w-full">
        <Table.Head>
          <Table.HeadCell>Day</Table.HeadCell>
          {sortedUsers.map((user) => (
            <Table.HeadCell key={user.id}>
              <UserDisplay
                rank={getTotalRankingByUserId(user.id)}
                user={user}
                centered
              />
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          <TotalRow sets={filteredSets} users={sortedUsers} />
          {noneToday && <NoneTodayRow users={sortedUsers} />}
          {Object.values(days).map((day, index) => (
            <TableRow key={index}>
              <MainTableCell>
                {format(new Date(day[0].createdAt), "MMM d")}
              </MainTableCell>
              {sortedUsers.map((user) => (
                <RepsTableDayRow key={user.id} userId={user.id} sets={day} />
              ))}
            </TableRow>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
