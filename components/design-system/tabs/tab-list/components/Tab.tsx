import { Tab as HeadlessTab } from "@headlessui/react";
import { ReactNode } from "react";
import classNames from "classnames";

interface Props {
  children: ReactNode;
}

export const Tab = ({ children }: Props) => (
  <HeadlessTab
    className={({ selected }) =>
      classNames(
        "w-full rounded-lg py-2.5 text-sm font-extrabold leading-5 text-slate-900 dark:text-blue-700",
        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
        selected
          ? "bg-white shadow"
          : "text-slate-700 dark:text-blue-100 hover:bg-white/[0.12] hover:text-slate-800 dark:hover:text-white"
      )
    }
  >
    {children}
  </HeadlessTab>
);
