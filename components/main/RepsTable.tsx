import { format, isToday } from "date-fns";
import { Set, User } from "../../models/models";
import { TableHeader } from "./TableHeader";
import { groupBy } from "lodash";
import { AddRep } from "./AddRep";

interface Props {
  sets: Set[];
  users: User[];
}

export const RepsTable = ({ sets, users }: Props) => {
  const days: Set[][] = groupBy(sets, (set) =>
    format(new Date(set.createdAt), "dd MMM")
  );

  const noneToday = !sets.some((set) => isToday(new Date(set.createdAt)));

  return (
    <table className="w-full table-fixed border border-collapse border-slate-300 rounded min-w-[800px]">
      <thead>
        <tr className="bg-slate-100">
          <th />
          {users.map((user) => (
            <th key={user.id} className="border border-slate-300 px-1 py-1">
              <TableHeader user={user} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.values(days).map((day, index) => (
          <tr key={index}>
            <td className="border border-slate-300 px-3 py-1">
              {format(new Date(day[0].createdAt), "dd MMM")}
            </td>
            {users.map((user) => (
              <td key={user.id} className="border border-slate-300 px-3 py-1">
                {day
                  .filter((set) => set.userId === user.id)
                  .map((set) => set.reps)
                  .reduce((a, b) => a + b, 0)}
              </td>
            ))}
          </tr>
        ))}
        {noneToday && (
          <tr>
            <td className="border border-slate-300 px-3 py-1">
              {format(new Date(), "dd MMM")}
            </td>
            {users.map((user) => (
              <td key={user.id} className="border border-slate-300 px-3 py-1">
                0
              </td>
            ))}
          </tr>
        )}
        <tr>
          <td className="border border-slate-300 px-3 py-1">Add reps today</td>
          {users.map((user) => (
            <td key={user.id} className="border border-slate-300 px-3 py-1">
              <AddRep userId={user.id} />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
