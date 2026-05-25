import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/5 backdrop-blur-md",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.06] before:to-transparent",
        className
      )}
      {...props} />)
  );
}

export { Skeleton }
