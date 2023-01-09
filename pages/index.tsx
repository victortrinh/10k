import { AddReps } from "@components/main/add-reps/AddReps";
import { Container, Heading } from "@components/design-system";
import { Exercise, Set, User } from "@models/models";
import { GetServerSideProps } from "next";
import { Tab as HeadlessTab } from "@headlessui/react";
import { ParsedUrlQuery } from "querystring";
import { RepsTable } from "@components/main/RepsTable";
import { Tab } from "@components/design-system/tabs/tab-list/components/Tab";
import { TabList } from "@components/design-system/tabs/tab-list/TabList";
import { TabPanel } from "@components/design-system/tabs/TabPanel";
import { initializeSetStore } from "@stores/setStore";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import React, { useEffect } from "react";
import prisma from "@lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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

  const sets = await prisma.set.findMany({
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

  const exercises = await prisma.exercise.findMany({
    orderBy: [
      {
        name: "asc"
      }
    ]
  });

  return {
    props: {
      query,
      users,
      sets: JSON.parse(JSON.stringify(sets)),
      exercises
    }
  };
};

interface Props {
  query: ParsedUrlQuery;
  sets: Set[];
  exercises: Exercise[];
  users: User[];
}

const Main = ({ query, exercises, sets, users }: Props) => {
  const router = useRouter();
  const { tab } = query;

  useEffect(() => {
    initializeSetStore(sets);
  }, []);

  const selectedIndex =
    tab === "total"
      ? 3
      : exercises.findIndex((exercise) => exercise.name === tab);

  const onChangeTab = (index: number) => {
    router.replace({
      query: { tab: exercises[index]?.name ?? "total" }
    });
  };

  return (
    <Layout>
      <Container>
        <main>
          <HeadlessTab.Group
            selectedIndex={selectedIndex}
            onChange={onChangeTab}
          >
            <TabList>
              {exercises.map((exercise) => (
                <Tab key={exercise.id}>
                  {exercise.name}
                </Tab>
              ))}
              <Tab key="total">
Total
              </Tab>
            </TabList>
            <HeadlessTab.Panels className="mt-4">
              {exercises.map((exercise) => (
                <TabPanel key={exercise.id}>
                  <Heading as="h1">
                    Add reps for 
                    {" "}
                    {exercise.name.toLowerCase()}
                  </Heading>
                  <div className="flex flex-col gap-8">
                    <AddReps exercise={exercise} users={users} />
                    <RepsTable exerciseId={exercise.id} users={users} />
                  </div>
                </TabPanel>
              ))}
              <TabPanel key="total">
                <Heading as="h1">
Total
                </Heading>
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
