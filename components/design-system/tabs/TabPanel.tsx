import { Card } from "flowbite-react";
import { ReactNode } from "react";
import { Tab } from "@headlessui/react";

interface Props {
  children: ReactNode;
}

export const TabPanel = ({ children }: Props) => (
  <Tab.Panel>
    <Card className="p-4">
      {children}
    </Card>
  </Tab.Panel>
);
