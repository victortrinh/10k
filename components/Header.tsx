import { Container } from "./design-system";
import { ModeToggle } from "./ModeToggle";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { ReactNode } from "react";
import classNames from "classnames";

const Header: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

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
    router.push("/");
  }

  return (
    <div className="w-full h-[60px] mb-6 flex items-center">
      <Container className="h-full">
        <div className="w-full h-full relative border-b border-gray-300 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className=" flex items-center cursor-pointer" onClick={onClickLogo}>
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
            <LinkButton isActive={isActive("/")} onClick={() => router.push("/")}>Add reps</LinkButton>
            <LinkButton isActive={isActive("/total")} onClick={() => router.push("/total")}>Total</LinkButton>
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
      <button className="font-medium dark:text-slate-200" onClick={() => signIn("discord")} disabled={isLoading}>
        Log in
      </button> 
    );
  }

  return (
    <LinkButton disabled={isLoading} onClick={() => signOut()}>
      Log out
    </LinkButton>
  );
};

interface ButtonProps {
  isActive?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

const LinkButton = ({ children, disabled, isActive, onClick }: ButtonProps) => (
  <button className={classNames("h-[60px] font-medium dark:text-slate-200", isActive && "-mb-px border-b-2 border-slate-800 dark:border-slate-300")} disabled={disabled} onClick={onClick}>
    {children}
  </button>
);
