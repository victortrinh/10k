import { Exercise } from "@models/models";
import { Tab as HeadlessTab } from "@headlessui/react";
import { Tab } from "@components/design-system/tabs/tab-list/components/Tab";
import { TabList } from "@components/design-system/tabs/tab-list/TabList";
import Router from "next/router";

interface Props {
  exercises: Exercise[];
  exerciseName: string;
}

export const MainTabs = ({ exercises, exerciseName }: Props) => {
  const selectedIndex =
  exerciseName === "total"
    ? exercises.length
    : exercises.findIndex((exercise) => exercise.name === exerciseName);
  
  function onChangeTab(index) {
    const exercise = exercises[index]?.name ?? "total";
    Router.push("/[exercise]", `/${exercise.toLowerCase()}`);
  }

  return (
    <HeadlessTab.Group
      selectedIndex={selectedIndex}
      onChange={onChangeTab}
    >
      <TabList>
        {exercises.map((exercise) => (
          <Tab key={exercise.id}>
            {exercise.name}
          </Tab>
        ))}
        <Tab key="total">
          Total
        </Tab>
      </TabList>
    </HeadlessTab.Group>
  );
};