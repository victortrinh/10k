import { AddRepsForm } from "@components/main/add-reps-form/AddRepsForm";
import { Container, Heading } from "@components/design-system";
import { Exercise, Set, User } from "@models/models";
import { GetStaticProps } from "next";
import { MainTabs } from "@components/main-tabs/MainTabs";
import { RepsTable } from "@components/main/RepsTable";
import { Tab } from "@headlessui/react";
import { initializeSetStore } from "@stores/setStore";
import { useSession } from "next-auth/react";
import Layout from "@components/Layout";
import React, { useEffect } from "react";
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
  useEffect(() => {
    initializeSetStore(sets);
  }, []);

  const { data: session } = useSession();

  return (
    <Layout>
      <Container>
        <main>
          <Heading as="h1">
            Welcome 
            {" "}
            {session?.user.name}
            !
          </Heading>
          <div className="flex flex-col gap-8">
            <div className="flex gap-3">
              <AddRepsForm exercises={exercises} />
            </div>
            <Tab.Group>
              <MainTabs exercises={exercises} />
              <Tab.Panels>
                {exercises.map((exercise) => (
                  <Tab.Panel key={exercise.id}>
                    <RepsTable exerciseId={exercise.id} users={users} />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </main>
      </Container>
    </Layout>
  );
};

export default Main;
