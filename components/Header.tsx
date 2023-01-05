import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Home
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  const right = (
    <div className="right">
      <style jsx>{`
        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        a + a {
          margin-left: 1rem;
        }

        .right {
          margin-left: auto;
        }

        .right a {
          border: 1px solid var(--geist-foreground);
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
