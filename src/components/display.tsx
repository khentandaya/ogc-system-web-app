import { cn } from "@/utils/cn";
import React from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

export default function Display({
  className,
  children,
  value,
  ...props
}: Props) {
  return (
    <div className={cn("grid grid-cols-2 gap-10", className)}>
      <h1 className="flex justify-end font-semibold">{value}</h1>
      <p className="flex justify-start text-sm font-bold">{children}</p>
    </div>
  );
}
