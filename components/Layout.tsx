import Header from "./Header";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => (
  <div className="min-h-screen">
    <div className="absolute pointer-events-none bg-gradient-to-b from-[#3B1067]/[0.3] dark:from-[#3B1067]/[0.5] w-full h-64" />
    <Header />
    <div className="pb-12">
      {children}
    </div>
  </div>
);

export default Layout;
