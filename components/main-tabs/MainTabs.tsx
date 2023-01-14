import { Exercise } from "@models/models";
import { Tab } from "@components/design-system/tabs/tab-list/components/Tab";
import { TabList } from "@components/design-system/tabs/tab-list/TabList";

interface Props {
  exercises: Exercise[];
}

export const MainTabs = ({ exercises }: Props) =>  (
  <TabList>
    {exercises.map((exercise) => (
      <Tab key={exercise.id}>
        {exercise.name}
      </Tab>
    ))}
  </TabList>
);
