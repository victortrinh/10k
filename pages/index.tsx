import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { Container } from "../components/design-system";
import { RepsTable } from "../components/main/RepsTable";
import { Set, User } from "../models/models";

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
  return (
    <Layout>
      <Container>
        <main className="overflow-auto">
          <RepsTable sets={sets} users={users} />
        </main>
      </Container>
    </Layout>
  );
};

export default Main;
