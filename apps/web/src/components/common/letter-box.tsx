import { useMemo } from "react";

const COLORS = [
  ["text-rose-900 dark:text-rose-200", "bg-rose-100 dark:bg-rose-900/30"],
  ["text-pink-900 dark:text-pink-200", "bg-pink-100 dark:bg-pink-900/30"],
  [
    "text-fuchsia-900 dark:text-fuchsia-200",
    "bg-fuchsia-100 dark:bg-fuchsia-900/30",
  ],
  [
    "text-purple-900 dark:text-purple-200",
    "bg-purple-100 dark:bg-purple-900/30",
  ],
  [
    "text-violet-900 dark:text-violet-200",
    "bg-violet-100 dark:bg-violet-900/30",
  ],
  [
    "text-indigo-900 dark:text-indigo-200",
    "bg-indigo-100 dark:bg-indigo-900/30",
  ],
  ["text-blue-900 dark:text-blue-200", "bg-blue-100 dark:bg-blue-900/30"],
  ["text-cyan-900 dark:text-cyan-200", "bg-cyan-100 dark:bg-cyan-900/30"],
  ["text-teal-900 dark:text-teal-200", "bg-teal-100 dark:bg-teal-900/30"],
  [
    "text-emerald-900 dark:text-emerald-200",
    "bg-emerald-100 dark:bg-emerald-900/30",
  ],
  ["text-green-900 dark:text-green-200", "bg-green-100 dark:bg-green-900/30"],
  ["text-lime-900 dark:text-lime-200", "bg-lime-100 dark:bg-lime-900/30"],
  ["text-amber-900 dark:text-amber-200", "bg-amber-100 dark:bg-amber-900/30"],
  [
    "text-orange-900 dark:text-orange-200",
    "bg-orange-100 dark:bg-orange-900/30",
  ],
];

interface LetterBoxProps {
  text: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export const LetterBox = ({ text, size = "md" }: LetterBoxProps) => {
  const [textColor, bgColor] = useMemo(() => {
    const index =
      Math.abs(
        text.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      ) % COLORS.length;
    return COLORS[index];
  }, [text]);

  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${textColor} ${bgColor} flex items-center justify-center rounded-lg font-semibold`}
    >
      {text.charAt(0).toUpperCase()}
    </div>
  );
};
