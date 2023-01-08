import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="py-8 min-h-screen bg-slate-100 dark:bg-background">
    <div>{children}</div>
  </div>
);

export default Layout;
