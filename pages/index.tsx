import React, { Fragment, useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { Container, Heading } from "../components/design-system";
import { RepsTable } from "../components/main/RepsTable";
import { Exercise, Set, User } from "../models/models";
import { AddReps } from "../components/main/add-reps/AddReps";
import { initializeSetStore } from "../stores/setStore";

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany();
  const sets = await prisma.set.findMany({
    include: {
      user: true,
      exercise: true,
    },
  });
  const exercises = await prisma.exercise.findMany();

  return {
    props: {
      users,
      sets: JSON.parse(JSON.stringify(sets)),
      exercises,
    },
    revalidate: 10,
  };
};

interface Props {
  sets: Set[];
  exercises: Exercise[];
  users: User[];
}

const Main = ({ exercises, sets, users }: Props) => {
  useEffect(() => {
    initializeSetStore(sets);
  }, []);

  return (
    <Layout>
      <Container>
        <main>
          <Heading as="h1">Add reps today</Heading>
          <div className="flex flex-col gap-8">
            {exercises.map((exercise) => (
              <Fragment key={exercise.id}>
                <Heading as="h2">{exercise.name}</Heading>
                <div className="overflow-x-auto max-w-full">
                  <AddReps exerciseId={exercise.id} users={users} />
                </div>
                <div className="overflow-x-auto max-w-full">
                  <RepsTable exerciseId={exercise.id} users={users} />
                </div>
              </Fragment>
            ))}
          </div>
        </main>
      </Container>
    </Layout>
  );
};

export default Main;
