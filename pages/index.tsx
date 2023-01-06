import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { Container, Heading } from "../components/design-system";
import { RepsTable } from "../components/main/RepsTable";
import { Set, User } from "../models/models";
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

  return {
    props: {
      users,
      sets: JSON.parse(JSON.stringify(sets)),
    },
    revalidate: 10,
  };
};

interface Props {
  users: User[];
  sets: Set[];
}

const Main = ({ sets, users }: Props) => {
  useEffect(() => {
    initializeSetStore(sets);
  }, []);

  return (
    <Layout>
      <Container>
        <main>
          <Heading as="h1">Add reps today</Heading>
          <div className="flex flex-col gap-8">
            <div className="overflow-x-auto max-w-full">
              <AddReps users={users} />
            </div>
            <div className="overflow-x-auto max-w-full">
              <RepsTable users={users} />
            </div>
          </div>
        </main>
      </Container>
    </Layout>
  );
};

export default Main;
