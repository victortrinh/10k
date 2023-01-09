import { Container } from "@components/design-system";
import { GetServerSideProps } from "next";
import Layout from "@components/Layout";
import React from "react";
import prisma from "@lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: String(params?.id)
    }
  });

  return {
    props: user
  };
};

const User = (props) => {
  const { name } = props;

  return (
    <Layout>
      <Container>
        <h2>
          {name}
        </h2>
      </Container>
    </Layout>
  );
};

export default User;
