import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="mt-12">
    {/* <Header /> */}
    <div>{children}</div>
  </div>
);

export default Layout;
