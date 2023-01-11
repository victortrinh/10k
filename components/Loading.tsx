import { Container } from "./design-system";
import { MainTabs } from "./main-tabs/MainTabs";
import { Spinner } from "flowbite-react";
import { useExerciseStore } from "@stores/exerciseStore";
import Layout from "./Layout";
import React, { useEffect, useState } from "react";

export const Loading = () => {
  const [exerciseName, exercises] = useExerciseStore((state) => [state.exerciseName, state.exercises]);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSpinner(true);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Layout>
      <Container>
        <main className="text-center flex flex-col gap-12">
          {exercises.length > 0 && exerciseName && <MainTabs exerciseName={exerciseName} exercises={exercises} />}
          {showSpinner && <Spinner size="xl" />}
        </main>
      </Container>
    </Layout>
  );
};
  
