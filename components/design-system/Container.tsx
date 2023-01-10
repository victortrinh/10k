import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Container = ({ className, children }: Props) => (
  <div className={classNames("container", className)}>
    {children}
  </div>
);
