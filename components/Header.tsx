import { Button, Spinner } from "flowbite-react";
import { Container } from "./design-system";
import { ModeToggle } from "./ModeToggle";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import Router from "next/router";

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
      priority
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
        priority
      />
    );
  }

  function onClickLogo() {
    Router.push("/");
  }

  return (
    <div className="w-full h-[60px] mb-6 flex items-center">
      <Container className="h-full">
        <div className="w-full h-full relative border-b border-gray-300 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={onClickLogo}>
            {logo}
            <Image
              className="w-10 h-auto"
              src="/images/stay-hard.png"
              alt="Stay hard"
              width={logoSize}
              height={logoSize}
              priority
            />
          </div>
          <div className="flex items-center gap-3">
            <ShownTab />
            <ModeToggle />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;

const ShownTab = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  if (!session) {
    return (
      <Button onClick={() => signIn("discord")} disabled={isLoading} gradientDuoTone="purpleToPink">
        Log in
        {isLoading && <Spinner className="ml-3" size="sm" light />}
      </Button> 
    );
  }

  return (
    <Button disabled={isLoading} gradientDuoTone="purpleToPink" onClick={() => signOut()}>
      Log out
      {isLoading && <Spinner className="ml-3" size="sm" light />}
    </Button>
  );
};
