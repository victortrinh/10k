import React, { ReactNode } from "react";
import { ModeToggle } from "./ModeToggle";
import { Container } from "./design-system";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="min-h-screen bg-slate-100 dark:bg-background">
    <div className="w-full h-12 mb-6 flex items-center bg-slate-300 dark:bg-slate-800">
      <Container className="flex items-center justify-between">
        <div className="flex items-end font-serif dark:text-white font-extrabold text-3xl tracking-tighter">
          <div>10k</div>
          <div className="ml-2 uppercase text-xl">stay hard</div>
        </div>
        <ModeToggle />
      </Container>
    </div>
    <div>{children}</div>
  </div>
);

export default Layout;
