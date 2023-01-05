import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import Router from "next/router";
import { Heading, Container } from "../components/design-system";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.user.findMany();

  return {
    props: { feed },
    revalidate: 10,
  };
};

const Main = (props) => {
  return (
    <Layout>
      <Container>
        <Heading as="h1">Who you?</Heading>
        <main>
          {props.feed.map((user) => (
            <div
              onClick={() => Router.push("/user/[id]", `/user/${user.id}`)}
              key={user.id}
              className="flex items-center cursor-pointer"
            >
              {user.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  width="30"
                  height="auto"
                />
              )}
              {user.name}
            </div>
          ))}
        </main>
      </Container>
    </Layout>
  );
};

export default Main;
