import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="py-8 min-h-screen dark:bg-background">
    <div>{children}</div>
  </div>
);

export default Layout;
