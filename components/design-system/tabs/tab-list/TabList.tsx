import { ReactNode } from "react";
import { Tab } from "@headlessui/react";

interface Props {
  children: ReactNode;
}

export const TabList = ({ children }: Props) => (
  <Tab.List className="flex space-x-1 rounded-full bg-background/[0.05] dark:bg-background/[0.8] p-1">
    {children}
  </Tab.List>
);
