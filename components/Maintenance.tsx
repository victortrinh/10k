import { Container, Heading } from "./design-system";
import { GiHammerDrop } from "react-icons/gi";
import Layout from "./Layout";
import React from "react";


const Maintenance = () => (
  <Layout>
    <Container>
      <main className="text-center flex flex-col items-center mt-8">
        <GiHammerDrop className="mb-6" size={70} />
        <Heading as="h1">Under maintenance</Heading>
        <div className="max-w-[600px]">
          <Heading as="h3">
            Our team is performing a scheduled maintenance
          </Heading>
          <Heading as="h4">
            I know it's 
            hard, but try and remember the reps you did to input them later when we're back on!
          </Heading>
        </div>
      </main>
    </Container>
  </Layout>
);

export default Maintenance;
