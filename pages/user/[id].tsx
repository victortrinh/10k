import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { Container } from "../../components/design-system";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: String(params?.id),
    },
  });

  return {
    props: user,
  };
};

const User = (props) => {
  const { name } = props;

  return (
    <Layout>
      <Container>
        <h2>{name}</h2>
      </Container>
    </Layout>
  );
};

export default User;
