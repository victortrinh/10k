import { Container } from "./design-system";
import { ModeToggle } from "./ModeToggle";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

const Header: React.FC = () => {
  const { theme } = useTheme();

  const logoSize = 40;

  let logo = (
    <Image
      className="w-10 h-auto"
      src="/images/logo-white.png"
      alt="10k"
      width={logoSize}
      height={logoSize}
    />
  );

  if (theme === "light") {
    logo = (
      <Image
        className="w-10 h-auto"
        src="/images/logo-black.png"
        alt="10k"
        width={logoSize}
        height={logoSize}
      />
    );
  }

  return (
    <div className="w-full h-[60px] mb-6 flex items-center">
      <Container className="h-full">
        <div className="w-full h-full relative border-b border-gray-300 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center">
            {logo}
            <Image
              className="w-10 h-auto"
              src="/images/stay-hard.png"
              alt="Stay hard"
              width={logoSize}
              height={logoSize}
            />
          </div>

          <ModeToggle />
        </div>
      </Container>
    </div>
  );
};

export default Header;
