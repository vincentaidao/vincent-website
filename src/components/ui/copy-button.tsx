"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./button";

export default function CopyButton({
  content,
  ariaLabel,
  variant = "outline",
  size = "icon",
  className = "",
}: {
  content: string;
  ariaLabel: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "icon";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      type="button"
      aria-label={ariaLabel}
      onClick={handleCopy}
    >
      {copied ? <Check color="#5ee9b5" className="h-4 w-4" /> : <Copy color="#e5e5e5" className="h-4 w-4" />}
    </Button>
  );
}
