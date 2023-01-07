import { Tab } from "@headlessui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const TabList = ({ children }: Props) => (
  <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
    {children}
  </Tab.List>
);
