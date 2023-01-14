import { ReactNode, useMemo } from "react";

interface Props {
  as: "h1" | "h2" | "h3" | "h4" | "h5";
  children: ReactNode;
}

export const Heading = ({ as: Component, children }: Props) => {
  const className = useMemo(() => {
    switch (Component) {
      case "h1":
        return "text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3 lg:mb-4";
      case "h2":
        return "text-xl md:text-2xl lg:text-3xl mb-1 md:mb-2 lg:mb-3";
      case "h3":
        return "text-lg md:text-xl lg:text-2xl mb-0.5 md:mb-1 lg:mb-2";
      case "h4":
        return "text-md md:text-lg lg:text-xl mb-0.5 md:mb-1 lg:mb-2";
      case "h5":
        return "text-sm md:text-md lg:text-lg mb-0.5 md:mb-1 lg:mb-2";
      default:
        return "text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3 lg:mb-4";
    }
  }, [Component]);

  const gradientClassName = useMemo(() => {
    switch (Component) {
      case "h1":
        return "to-yellow-400 from-pink-600";
      case "h2":
        return "to-green-600 from-sky-400";
      default:
        return "";
    }
  }, [Component]);

  return (
    <Component
      className={`${className} dark:text-white font-sans font-extrabold tracking-wide`}
    >
      {Component === "h1" || Component === "h2"
        ? (
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientClassName}`}>
            {children}
          </span>
        )
        : (
          <>
            {children}
          </>
        )}
    </Component>
  );
};
