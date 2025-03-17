import { cn } from "@/lib/utils";

type LogoBoxProps = {
  className?: string;
};

export const LogoBox = ({ className }: LogoBoxProps) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-xl text-black dark:text-white",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="#c8e6ca"
          strokeWidth="10"
          fill="none"
        />
        <circle cx="50" cy="50" r="20" fill="#4db050" />
      </svg>
    </div>
  );
};
