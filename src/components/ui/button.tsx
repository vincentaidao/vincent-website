import { ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500";

export function Button({
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost"; size?: "default" | "icon" }) {
  const styles =
    variant === "outline"
      ? "border border-neutral-700 text-neutral-200 hover:border-neutral-500"
      : variant === "ghost"
        ? "text-neutral-200 hover:bg-neutral-900"
        : "bg-neutral-50 text-neutral-950 hover:bg-white";
  const sizes = size === "icon" ? "h-8 w-8 p-0" : "";
  return <button className={`${base} ${styles} ${sizes} ${className}`} {...props} />;
}
