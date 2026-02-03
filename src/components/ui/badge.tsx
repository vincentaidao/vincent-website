import { ReactNode } from "react";

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs text-neutral-300 ${className}`}>
      {children}
    </span>
  );
}
