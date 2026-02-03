import { ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500";

export function Button({
  variant = "default",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" }) {
  const styles =
    variant === "outline"
      ? "border border-neutral-700 text-neutral-200 hover:border-neutral-500"
      : "bg-neutral-50 text-neutral-950 hover:bg-white";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
