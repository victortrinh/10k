import { Card } from "flowbite-react";
import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export const BeautifulCard = ({ children, className }: Props) => (
  <Card className={classNames(className, "rounded-xl")}>
    {children}
  </Card>
);