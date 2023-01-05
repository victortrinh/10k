import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let left = (
    <Link href="/">
      <a className="font-bold" data-active={isActive("/")}>
        Home
      </a>
    </Link>
  );

  return (
    <nav className="shadow-sm flex h-[60px] items-center mb-8">
      <div className="container">{left}</div>
    </nav>
  );
};

export default Header;
