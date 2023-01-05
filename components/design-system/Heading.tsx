import { ReactNode, useMemo } from "react";

interface Props {
  as: "h1" | "h2" | "h3" | "h4" | "h5";
  children: ReactNode;
}

export const Heading = ({ as: Component, children }: Props) => {
  const className = useMemo(() => {
    switch (Component) {
      case "h1":
        return "text-5xl";
      case "h2":
        return "text-4xl";
      case "h3":
        return "text-3xl";
      case "h4":
        return "text-2xl";
      case "h5":
        return "text-xl";
      default:
        return "text-5xl";
    }
  }, [Component]);

  return <Component className={`${className} mb-4`}>{children}</Component>;
};
