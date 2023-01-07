import { format, isToday } from "date-fns";
import { Set, User } from "../../models/models";
import { Ranking, UserDisplay } from "../UserDisplay";
import { groupBy } from "lodash";
import { ReactNode } from "react";
import { useSetStore } from "../../stores/setStore";
import { Table } from "flowbite-react";
import classNames from "classnames";

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

  function totalRepsByUserId(userId: string) {
    return filteredSets
      .filter((set) => set.userId === userId)
      .map((set) => set.reps)
      .reduce((a, b) => a + b, 0);
  }

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

  return (
    <div className="overflow-x-auto max-w-full">
      <Table className="min-w-[900px] w-full">
        <Table.Head>
          <Table.HeadCell>Day</Table.HeadCell>
          {users.map((user) => (
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
          {Object.values(days).map((day, index) => (
            <TableRow key={index}>
              <MainTableCell>
                {format(new Date(day[0].createdAt), "MMM d")}
              </MainTableCell>
              {users.map((user) => (
                <Table.Cell className="text-center" key={user.id}>
                  {day
                    .filter((set) => set.userId === user.id)
                    .map((set) => set.reps)
                    .reduce((a, b) => a + b, 0)}
                </Table.Cell>
              ))}
            </TableRow>
          ))}
          {noneToday && (
            <TableRow>
              <MainTableCell>{format(new Date(), "MMM d")}</MainTableCell>
              {users.map((user) => (
                <Table.Cell className="text-center" key={user.id}>
                  0
                </Table.Cell>
              ))}
            </TableRow>
          )}
          <TableRow>
            <MainTableCell>Total</MainTableCell>
            {users.map((user) => (
              <MainTableCell centered key={user.id}>
                {totalRepsByUserId(user.id)}
              </MainTableCell>
            ))}
          </TableRow>
        </Table.Body>
      </Table>
    </div>
  );
};

interface DataProps {
  centered?: boolean;
  children: ReactNode;
}

const TableRow = ({ children }: DataProps) => (
  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
    {children}
  </Table.Row>
);

const MainTableCell = ({ centered, children }: DataProps) => (
  <Table.Cell
    className={classNames(
      "font-bold whitespace-nowrap text-gray-900 dark:text-white",
      centered && "text-center"
    )}
  >
    {children}
  </Table.Cell>
);
