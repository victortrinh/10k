import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="pt-12 min-h-screen bg-background">
    <div>{children}</div>
  </div>
);

export default Layout;
