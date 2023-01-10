import { AddReps } from "@components/main/add-reps/AddReps";
import { Container, Heading } from "@components/design-system";
import { Exercise, Set, User } from "@models/models";
import { GetStaticProps } from "next";
import { MainTabs } from "@components/main-tabs/MainTabs";
import { RepsTable } from "@components/main/RepsTable";
import Layout from "@components/Layout";
import React from "react";
import prisma from "@lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
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

  const [firstExercise] = exercises;

  const sets = await prisma.set.findMany({
    where: {
      exercise: {
        name: firstExercise.name
      }
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
      users,
      sets: JSON.parse(JSON.stringify(sets)),
      exercises
    },
    revalidate: 10
  };
};

interface Props {
  sets: Set[];
  exercises: Exercise[];
  users: User[];
}

const Main = ({ exercises, users, sets }: Props) => {
  const [firstExercise] = exercises;

  return (
    <Layout>
      <Container>
        <main>
          <MainTabs exercises={exercises} exerciseName={firstExercise.name} />
          <div className="mt-8 mb-6">
            <Heading as="h1">Add reps for Pull ups</Heading>
          </div>
          <div className="flex flex-col gap-8">
            <AddReps exercise={firstExercise} users={users} />
            <RepsTable sets={sets} exerciseId={firstExercise.id} users={users} />
          </div>
        </main>
      </Container>
    </Layout>
  );
};

export default Main;
