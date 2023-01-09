import { ReactNode, useMemo } from "react";

interface Props {
  as: "h1" | "h2" | "h3" | "h4" | "h5";
  children: ReactNode;
}

export const Heading = ({ as: Component, children }: Props) => {
  const className = useMemo(() => {
    switch (Component) {
      case "h1":
        return "text-2xl md:text-3xl lg:text-4xl";
      case "h2":
        return "text-xl md:text-2xl lg:text-3xl";
      case "h3":
        return "text-lg md:text-xl lg:text-2xl";
      case "h4":
        return "text-md md:text-lg lg:text-xl";
      case "h5":
        return "text-sm md:text-md lg:text-lg";
      default:
        return "text-2xl md:text-3xl lg:text-4xl";
    }
  }, [Component]);

  return (
    <Component
      className={`${className} mb-4 dark:text-white font-sans font-extrabold`}
    >
      {Component === "h1" ? (
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-sky-400">
          {children}
        </span>
      ) : (
        <>{children}</>
      )}
    </Component>
  );
};
