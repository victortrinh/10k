import { MainTableCell } from "./MainTableCell";
import { Set, User } from "@models/models";
import { TableRow } from "./TableRow";
import { groupBy } from "lodash";

interface Props {
  sets: Set[];
  users: User[];
}

export const TotalRow = ({ users, sets }: Props) => {
  function totalRepsByUserId(userId: string) {
    return sets
      .filter((set) => set.userId === userId)
      .map((set) => set.reps)
      .reduce((a, b) => a + b, 0);
  }

  function getRanking(userId: string) {
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
  }

  return (
    <TableRow>
      <MainTableCell>
        Total
      </MainTableCell>
      {users.map((user) => (
        <MainTableCell centered key={user.id}>
          {totalRepsByUserId(user.id)} 
          {" "}
          {getRanking(user.id)}
        </MainTableCell>
      ))}
    </TableRow>
  );
};
