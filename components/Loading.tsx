import { Container } from "./design-system";
import { Spinner } from "flowbite-react";
import Layout from "./Layout";
import React, { useEffect, useState } from "react";

export const Loading = () => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSpinner(true);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Layout>
      <Container>
        <main className="text-center flex flex-col gap-12">
          {showSpinner && <Spinner size="xl" />}
        </main>
      </Container>
    </Layout>
  );
};
  
