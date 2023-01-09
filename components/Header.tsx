import React from "react";
import { Container } from "./design-system";
import { ModeToggle } from "./ModeToggle";
import { useTheme } from "next-themes";
import Image from "next/image";

const Header: React.FC = () => {
  const { theme } = useTheme();

  const logoSize = 40;

  let logo = (
    <Image src="/images/logo-white.png" alt="10k" width={40} height={40} />
  );

  if (theme === "light") {
    logo = (
      <Image src="/images/logo-black.png" alt="10k" width={40} height={40} />
    );
  }

  return (
    <div className="w-full h-[60px] mb-6 flex items-center">
      <Container className="h-full">
        <div className="w-full h-full  border-b border-gray-800 flex items-center justify-between">
          {logo}
          <ModeToggle />
        </div>
      </Container>
    </div>
  );
};

export default Header;
