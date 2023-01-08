import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Container = ({ className, children }: Props) => (
  <div className={`container ${className}`}>{children}</div>
);
