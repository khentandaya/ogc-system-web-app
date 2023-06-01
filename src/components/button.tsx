import { cn } from "@/utils/cn";
import React from "react";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

export default function Button({ className, children, ...props }: Props) {
  return (
    <button
      className={cn(
        "rounded-lg bg-secondary w-fit px-3 py-2 hover:bg-secondary/60 hover:text-primary transistion-colors duration-200 border border-gray-300/70",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
