import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-neutral-800 bg-neutral-950/80 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`px-6 pt-6 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`text-lg font-semibold text-neutral-50 ${className}`}>{children}</div>;
}

export function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`text-sm text-neutral-400 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
}
