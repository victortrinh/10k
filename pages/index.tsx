import React, { Fragment, useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { Container, Heading } from "../components/design-system";
import { RepsTable } from "../components/main/RepsTable";
import { Exercise, Set, User } from "../models/models";
import { AddReps } from "../components/main/add-reps/AddReps";
import { initializeSetStore } from "../stores/setStore";
import { Tab as HeadlessTab } from "@headlessui/react";
import classNames from "classnames";
import { TabList } from "../components/design-system/tabs/tab-list/TabList";
import { Tab } from "../components/design-system/tabs/tab-list/components/Tab";
import { TabPanel } from "../components/design-system/tabs/TabPanel";

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
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
          <HeadlessTab.Group>
            <TabList>
              {exercises.map((exercise) => (
                <Tab key={exercise.id}>{exercise.name}</Tab>
              ))}
            </TabList>
            <HeadlessTab.Panels className="mt-2">
              {exercises.map((exercise) => (
                <TabPanel key={exercise.id}>
                  <div key={exercise.id} className="flex flex-col gap-8">
                    <AddReps exercise={exercise} users={users} />
                    <RepsTable exerciseId={exercise.id} users={users} />
                  </div>
                </TabPanel>
              ))}
            </HeadlessTab.Panels>
          </HeadlessTab.Group>
        </main>
      </Container>
    </Layout>
  );
};

export default Main;
