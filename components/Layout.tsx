import Header from "./Header";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className="min-h-screen bg-slate-100 dark:bg-background">
    <Header />
    <div className="pb-12">{children}</div>
  </div>
);

export default Layout;
