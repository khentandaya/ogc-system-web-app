import { cn } from "@/utils/cn";
import React from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

export default function Input({ className, children, ...props }: Props) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="px-1">{children}</label>
      <input className="px-2 outline-0 py-2 border-[2.5px] h-15 w-50 rounded-xl border-slate-300" {...props} />
    </div>
  );
}
