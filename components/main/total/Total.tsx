import { Container, Heading } from "@components/design-system";
import { Exercise, User } from "@models/models";
import { MainTabs } from "@components/main-tabs/MainTabs";
import { RepsTable } from "@components/main/RepsTable";
import { TotalPoints } from "./components/TotalPoints";
import Layout from "@components/Layout";

interface Props {
  exercises: Exercise[];
  users: User[];
}

export const Total = ({ exercises, users }: Props) => (
  <Layout>
    <Container>
      <main>
        <MainTabs exercises={exercises} exerciseName="total" />
        <div className="mt-8 mb-6">
          <Heading as="h1">Totals</Heading>
        </div>
        <TotalPoints users={users} />
        <div className="mt-8 mb-6">
          <Heading as="h2">Total reps</Heading>
        </div>
        <RepsTable users={users} />
      </main>
    </Container>
  </Layout>
);
  