import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function PageHero({
  image,
  className,
  imageClassName,
  children,
}: {
  image: string;
  className?: string;
  imageClassName?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("relative", className)}>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn("-z-10 object-cover", imageClassName)}
      />
      {children}
    </section>
  );
}
