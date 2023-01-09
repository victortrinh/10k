import { AddReps } from "@components/main/add-reps/AddReps";
import { Container, Heading } from "@components/design-system";
import { Exercise, Set, User } from "@models/models";
import { GetServerSideProps } from "next";
import { MainTabs } from "@components/main-tabs/MainTabs";
import { RepsTable } from "@components/main/RepsTable";
import { Total } from "@components/main/total/Total";
import { capitalize } from "lodash";
import { initializeSetStore } from "@stores/setStore";
import Layout from "@components/Layout";
import React, { useEffect } from "react";
import prisma from "@lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const users = await prisma.user.findMany({
    orderBy: [
      {
        name: "asc"
      }
    ],
    include: {
      sets: {
        select: {
          reps: true,
          exercise: true
        }
      }
    }
  });

  const exercises = await prisma.exercise.findMany({
    orderBy: [
      {
        name: "asc"
      }
    ]
  });

  const sets = await prisma.set.findMany({
    where: { 
      ...(String(params?.exercise) !== "total"
        ? { exercise: {
          name: capitalize(String(params?.exercise))
        }  }
        : {})
      
    },
    orderBy: [
      {
        createdAt: "desc"
      }
    ],
    include: {
      user: true,
      exercise: true
    }
  });

  return {
    props: {
      exercise: capitalize(String(params?.exercise)),
      users,
      sets: JSON.parse(JSON.stringify(sets)),
      exercises
    }
  };
};

interface Props {
  exercise: string;
  sets: Set[];
  exercises: Exercise[];
  users: User[];
}

const Main = ({ exercise, exercises, sets, users }: Props) => {
  const selectedExercise = exercises.find(e => e.name === exercise);

  useEffect(() => {
    initializeSetStore(sets);
  }, [sets]);

  if (!selectedExercise) {
    return  (
      <Total exercises={exercises} users={users} />
    );
  }

  return (
    <Layout>
      <Container>
        <main>
          <MainTabs exercises={exercises} exerciseName={exercise} />
          <div className="mt-8 mb-6">
            <Heading as="h1">
              Add reps for
              {" "}
              {exercise.toLowerCase()}
            </Heading>
          </div>
          <div className="flex flex-col gap-8">
            <AddReps exercise={selectedExercise} users={users} />
            <RepsTable exerciseId={selectedExercise.id} users={users} />
          </div>
        </main>
      </Container>
    </Layout>
  );
};

export default Main;
