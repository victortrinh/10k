import { Card } from "flowbite-react";
import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export const BeautifulCard = ({ children, className }: Props) => (
  <Card className={classNames(className, "rounded-xl border-none dark:bg-gradient-to-tr from-background/[0.5]")}>
    {children}
  </Card>
);