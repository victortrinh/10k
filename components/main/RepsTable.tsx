import { MainTableCell, NoneTodayRow, RepsTableDayRow, TableRow, TotalRow } from "./components";
import { Ranking, UserDisplay } from "@components/UserDisplay";
import { Set, User } from "@models/models";
import { Table } from "flowbite-react";
import { format, isToday } from "date-fns";
import { groupBy } from "lodash";
import { useSetStore } from "@stores/setStore";

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

  const days: Set[][] = Object.values(groupBy(filteredSets, (set) =>
    format(new Date(set.createdAt), "dd MMM yyyy")
  ));

  const setsByUser: Set[][] = Object.values(groupBy(filteredSets, (set) => set.userId));
  const totalRepsByUser = setsByUser
    .map((setByUser) => ({
      ...setByUser[0],
      reps: setByUser.map((set) => set.reps).reduce((a, b) => a + b, 0)
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
        .reduce((a, b) => a + b, 0)
    }))
    .sort((a, b) => b.reps - a.reps);

  return (
    <div
      className="max-w-full overflow-x-auto"
    >
      <Table striped>
        <Table.Head className="bg-slate-200">
          <Table.HeadCell className="min-w-[100px]">
            Day
          </Table.HeadCell>
          {sortedUsers.map((user) => (
            <Table.HeadCell className="min-w-[100px]" key={user.id}>
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
          {days.map((day) => (
            <TableRow key={day[0]?.id}>
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
