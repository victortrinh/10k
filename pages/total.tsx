import { Container, Heading } from "@components/design-system";
import { GetStaticProps } from "next";
import { RepsTable } from "@components/main/RepsTable";
import { Set, User } from "@models/models";
import { TotalPoints } from "@components/total/TotalPoints";
import { initializeSetStore } from "@stores/setStore";
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
      sets: JSON.parse(JSON.stringify(sets))
    },
    revalidate: 10
  };
};

interface Props {
  sets: Set[];
  users: User[];
}

const Main = ({ users, sets }: Props) => {
  useEffect(() => {
    initializeSetStore(sets);
  }, []);

  return (
    <Layout>
      <Container>
        <main>
          <div className="mt-8">
            <Heading as="h1">Totals</Heading>
          </div>
          <TotalPoints users={users} />
          <div className="mt-8">
            <Heading as="h2">Total reps</Heading>
          </div>
          <RepsTable users={users} />
        </main>
      </Container>
    </Layout>
  );
};

export default Main;
