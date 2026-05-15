import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  withGrid?: boolean;
}

export default function Section({ children, className, id, containerClassName, withGrid }: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn(
        "py-16 md:py-32 px-6 relative overflow-hidden", 
        className
      )}
    >
      {withGrid && <div className="grid-texture" />}
      <div className={cn("max-w-[1200px] mx-auto relative z-10", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
