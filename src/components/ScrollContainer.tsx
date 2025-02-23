import { PropsWithChildren } from "react";
export const ScrollContainer = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={`overflow-y-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-black/30 hover:[&::-webkit-scrollbar-thumb]:block dark:hover:[&::-webkit-scrollbar-thumb]:bg-black/30 transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  );
};
