import React, { Fragment, useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { Container, Heading } from "../components/design-system";
import { RepsTable } from "../components/main/RepsTable";
import { Exercise, Set, User } from "../models/models";
import { AddReps } from "../components/main/add-reps/AddReps";
import { initializeSetStore } from "../stores/setStore";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

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
          <Heading as="h1">Add reps</Heading>
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {exercises.map((exercise) => (
                <Tab
                  key={exercise.id}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  {exercise.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {exercises.map((exercise) => (
                <Tab.Panel
                  key={exercise.id}
                  className={classNames(
                    "rounded-xl bg-white p-8",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  <div key={exercise.id} className="flex flex-col gap-8">
                    <div className="overflow-x-auto max-w-full">
                      <AddReps exercise={exercise} users={users} />
                    </div>
                    <div className="overflow-x-auto max-w-full">
                      <RepsTable exerciseId={exercise.id} users={users} />
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </main>
      </Container>
    </Layout>
  );
};

export default Main;
