import { Button } from "flowbite-react";
import { ClientSafeProvider, getProviders, signIn, useSession } from "next-auth/react";
import { Container, Heading } from "@components/design-system";
import { GetServerSideProps } from "next";
import Layout from "@components/Layout";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers }
  };
};

interface Props {
  providers: ClientSafeProvider;
}

const SignIn = ({ providers }: Props) => {
  const { data: session } = useSession();
 
  if (session) {
    Router.push("/");
  }

  return (
    <Layout>
      <Container className="flex flex-col items-center">
        <Heading as="h1">Sign in</Heading>
        {Object.values(providers).map((provider) => (
          <div className="mt-8" key={provider.name}>
            <Button color="purple" className="font-medium" onClick={() => signIn(provider.id)}>
              Sign in with 
              {" "}
              {provider.name}
            </Button>
          </div>
        ))}
      </Container>
    </Layout>
  );
};

export default SignIn;