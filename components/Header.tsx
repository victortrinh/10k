import React from "react";
import { Container } from "./design-system";
import { ModeToggle } from "./ModeToggle";

const Header: React.FC = () => (
  <div className="w-full h-[60px] mb-6 flex items-center">
    <Container className="h-full">
      <div className="w-full h-full  border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-end font-serif dark:text-white font-extrabold text-3xl tracking-tighter">
          <div>10k</div>
          <div className="ml-2 uppercase text-xl">stay hard</div>
        </div>
        <ModeToggle />
      </div>
    </Container>
  </div>
);

export default Header;
