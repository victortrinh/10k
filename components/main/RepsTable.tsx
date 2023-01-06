import { format, isToday } from "date-fns";
import { Set, User } from "../../models/models";
import { UserDisplay } from "../UserDisplay";
import { groupBy } from "lodash";
import { ReactNode } from "react";
import { useSetStore } from "../../stores/setStore";

interface Props {
  users: User[];
}

export const RepsTable = ({ users }: Props) => {
  const sets = useSetStore((state) => state.sets);
  const days: Set[][] = groupBy(sets, (set) =>
    format(new Date(set.createdAt), "dd MMM")
  );

  const noneToday = !sets.some((set) => isToday(new Date(set.createdAt)));

  return (
    <table className="w-full table-fixed border-collapse min-w-[950px]">
      <thead>
        <tr>
          <th />
          {users.map((user) => (
            <Th key={user.id}>
              <UserDisplay user={user} />
            </Th>
          ))}
        </tr>
      </thead>
      <tbody className="border border-slate-200">
        {Object.values(days).map((day, index) => (
          <tr key={index}>
            <Td className="font-bold">
              {format(new Date(day[0].createdAt), "MMM d")}
            </Td>
            {users.map((user) => (
              <Td key={user.id}>
                {day
                  .filter((set) => set.userId === user.id)
                  .map((set) => set.reps)
                  .reduce((a, b) => a + b, 0)}
              </Td>
            ))}
          </tr>
        ))}
        {noneToday && (
          <tr>
            <Td className="font-bold">{format(new Date(), "MMM dd")}</Td>
            {users.map((user) => (
              <Td key={user.id}>0</Td>
            ))}
          </tr>
        )}
        <tr>
          <Td className="font-bold">Total</Td>
          {users.map((user) => (
            <Td className="font-bold" key={user.id}>
              {sets
                .filter((set) => set.userId === user.id)
                .map((set) => set.reps)
                .reduce((a, b) => a + b, 0)}
            </Td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

interface DataProps {
  className?: string;
  children: ReactNode;
}

const Th = ({ children }: DataProps) => (
  <th className="px-3 py-2 bg-slate-200 ">{children}</th>
);
const Td = ({ className, children }: DataProps) => (
  <td className={`${className} border-b border-slate-200 px-3 py-2`}>
    {children}
  </td>
);
