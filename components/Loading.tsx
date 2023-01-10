import { Container } from "./design-system";
import { MainTabs } from "./main-tabs/MainTabs";
import { Spinner } from "flowbite-react";
import { useExerciseStore } from "@stores/exerciseStore";
import Layout from "./Layout";
import React from "react";

export const Loading = () => {
  const [exerciseName, exercises] = useExerciseStore((state) => [state.exerciseName, state.exercises]);
  return (
    <Layout>
      <Container>
        <main className="text-center flex flex-col gap-12">
          {exercises.length > 0 && exerciseName && <MainTabs exerciseName={exerciseName} exercises={exercises} />}
          <Spinner size="xl" />
        </main>
      </Container>
    </Layout>
  );
};
  
