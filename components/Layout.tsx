import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="min-h-screen bg-slate-100 dark:bg-background">
    <Header />
    <div>{children}</div>
  </div>
);

export default Layout;
