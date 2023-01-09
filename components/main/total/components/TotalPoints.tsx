import { Card, Table } from "flowbite-react";
import { Heading } from "@components/design-system";
import { MainTableCell, TableRow } from "@components/main/components";
import { User } from "@models/models";
import { UserDisplay } from "@components/UserDisplay";

interface Props {
  users: User[];
}

export const TotalPoints = ({ users }: Props) => {
  const usersWithPoints = users.map(user => ({
    ...user,
    points: user.sets.reduce((a, b) => {
      let pointsToAdd = 0;

      switch(b.exercise.name) {
        case "Squats":
          pointsToAdd = b.reps / 10;
          break;
        case "Push ups":
          pointsToAdd = b.reps / 5;
          break;
        default:
          pointsToAdd = b.reps;
      }

      return a + pointsToAdd;
    }, 0)
  })).sort((a, b) => b.points - a.points);

  const [first, second, third, ...otherUsers] = usersWithPoints;

  return (
    <>
      <div className="mt-8 mb-6">
        <Heading as="h2">Total points</Heading>
      </div>
      <div className="mb-6 relative w-full h-[190px]">
        <div className="absolute right-1/2 translate-x-1/2">
          <div className="relative">
            <div className="w-fit flex flex-col gap-1 items-center text-lg font-bold">
              <UserDisplay user={first} rank="gold" size={120} />
              {first.name}
              <div className="text-sm font-medium -mt-1">
                {first.points}
                {" "}
                pts
              </div>
            </div>
            <div className="absolute -left-[80px] -bottom-[20px] gap-1 flex flex-col items-center text-lg font-bold">
              <UserDisplay className="bg-slate-100 dark:bg-background rounded-full" user={second} rank="silver" size={90} /> 
              {second.name}  
              <div className="text-sm font-medium -mt-1">
                {second.points}
                {" "}
                pts
              </div>
            </div>    
            <div className="absolute -right-[80px] -bottom-[20px] gap-1 flex flex-col items-center text-lg font-bold">
              <UserDisplay className="bg-slate-100 dark:bg-background rounded-full" user={third} rank="bronze" size={90} />
              {third.name}
              <div className="text-sm font-medium -mt-1">
                {third.points}
                {" "}
                pts
              </div>
            </div>
          </div>
        </div>
      </div>
      <Table striped className="mb-6">
        <Table.Head>
          <Table.HeadCell>
            Rank
          </Table.HeadCell>
          <Table.HeadCell>
            Name
          </Table.HeadCell>
          <Table.HeadCell>
            Points
          </Table.HeadCell>
        </Table.Head>
        {otherUsers.map((user, index) => (
          <TableRow key={user.id}>
            <MainTableCell>
              {index + 3}
            </MainTableCell>
            <Table.Cell>
              <UserDisplay user={user} showName />
            </Table.Cell>
            <MainTableCell>
              {user.points}
            </MainTableCell>
          </TableRow>
        ))}
      </Table>
      <Card className="w-fit">
        <Heading as="h3">Counts as 1 point</Heading>
        <div className="-mt-4">10 squats</div>
        <div className="-mt-4">5 push ups</div>
        <div className="-mt-4">1 pull-up</div>
      </Card>
    </>
  );
};