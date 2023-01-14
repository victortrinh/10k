import { Button, Dropdown, Navbar } from "flowbite-react";
import { ModeToggle } from "./ModeToggle";
import { UserDisplay } from "./UserDisplay";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

const Header: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const logoSize = 40;

  return (
    <Navbar
      fluid
      rounded
      className="mb-8 bg-slate-100 dark:bg-background container border-b border-gray-300 dark:border-gray-800 "
    >
      <Navbar.Brand href="/" className="mr-8">
        <Image
          src={`/images/${theme === "light"
            ? "logo-black"
            : "logo-white"}.png`}
          alt="10k"
          width={logoSize}
          height={logoSize}
          priority
        />
        <Image
          src="/images/stay-hard.png"
          alt="Stay hard"
          width={logoSize}
          height={logoSize}
          priority
        />
      </Navbar.Brand>
      <div className="flex flex-1 gap-2 justify-end md:order-2">
        <ModeToggle />
        <ShownTab />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="font-bold" href="/" active={isActive("/")}>
          Home
        </Navbar.Link>
        <Navbar.Link className="font-bold"  href="/total" active={isActive("/total")}>
          Total
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

const ShownTab = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  if (!session) {
    return (
      <Button outline gradientDuoTone="purpleToPink" onClick={() => signIn("discord")} disabled={isLoading}>
        Get started
      </Button>
    );
  }

  const { user } = session;

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={<UserDisplay user={user} />}
    >
      <Dropdown.Header>
        <span className="block text-sm">
          {user.name}
        </span>
        <span className="block truncate text-sm font-medium">
          {user.email}
        </span>
      </Dropdown.Header>
      <Dropdown.Item onClick={() => signOut()}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
};
