import { cn } from "@/utils/cn";
import React from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

export default function Radio({ className, children, ...props }: Props) {
  return (
    <div className={cn("flex gap-1 items-center text-sm text-slate-600", className)}>
      <input type="radio" className="w-5 h-5" {...props} />
      <label className="px-1">{children}</label>
    </div>
  );
}
