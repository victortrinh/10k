import React, { Fragment, useEffect, useMemo, useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { Container, Heading } from "../components/design-system";
import { RepsTable } from "../components/main/RepsTable";
import { Exercise, Set, User } from "../models/models";
import { AddReps } from "../components/main/add-reps/AddReps";
import { initializeSetStore } from "../stores/setStore";
import { Tab as HeadlessTab } from "@headlessui/react";
import { TabList } from "../components/design-system/tabs/tab-list/TabList";
import { Tab } from "../components/design-system/tabs/tab-list/components/Tab";
import { TabPanel } from "../components/design-system/tabs/TabPanel";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });
  const sets = await prisma.set.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    include: {
      user: true,
      exercise: true,
    },
  });
  const exercises = await prisma.exercise.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

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
  const router = useRouter();
  const { tab } = router.query;

  useEffect(() => {
    initializeSetStore(sets);
  }, []);

  const selectedIndex = useMemo(() => {
    if (tab === "total") {
      return 3;
    }

    return exercises.findIndex((exercise) => exercise.name === tab);
  }, [tab]);

  const onChangeTab = (index: number) => {
    router.replace({
      query: { tab: exercises[index]?.name ?? "total" },
    });
  };

  return (
    <Layout>
      <Container>
        <main>
          <Heading as="h1">Add reps</Heading>
          <HeadlessTab.Group
            selectedIndex={selectedIndex}
            onChange={onChangeTab}
          >
            <TabList>
              {exercises.map((exercise) => (
                <Tab key={exercise.id}>{exercise.name}</Tab>
              ))}
              <Tab key="total">Total</Tab>
            </TabList>
            <HeadlessTab.Panels className="mt-4">
              {exercises.map((exercise) => (
                <TabPanel key={exercise.id}>
                  <div className="flex flex-col gap-8">
                    <AddReps exercise={exercise} users={users} />
                    <RepsTable exerciseId={exercise.id} users={users} />
                  </div>
                </TabPanel>
              ))}
              <TabPanel key="total">
                <div className="flex flex-col gap-8">
                  <RepsTable users={users} />
                </div>
              </TabPanel>
            </HeadlessTab.Panels>
          </HeadlessTab.Group>
        </main>
      </Container>
    </Layout>
  );
};

export default Main;
