'use client'
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    pic: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [popup, setPopup] = useState({x: 0, y:0});
  useEffect(() => {
    // const ele = document.getElementById("popup");
    const tile = document.elementFromPoint(popup.x, popup.y) as HTMLElement;
    if (tile) {
      tile.style.backgroundImage = `url(${items[hoveredIndex!]?.pic})`;
      tile.style.backgroundSize = "contain";
      tile.style.backgroundPosition = "center";
      tile.style.backgroundRepeat = "no-repeat";
    }
    // if (ele && tile) {
    // ele.style.top = `${tile.getBoundingClientRect().top}px`;
    // ele.style.left = `${tile.getBoundingClientRect().left - ele.offsetWidth}px`;
    // ele.style.height = `${tile.getBoundingClientRect().height}px`;
    // }
  }, [popup]);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
        {/* {
            popup && (
                <div className="fixed inset-0 bg-white bg-opacity-90 h-10 w-fit z-50" id="popup">
                    <div className="flex justify-center items-center h-full">
                        <img src={items[hoveredIndex!]?.pic} alt={items[hoveredIndex!]?.title} className="h-full" />
                    </div>
                </div>
            )
        } */}
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={(e) => {
            setPopup({x: e.clientX, y: e.clientY});
            setHoveredIndex(idx);
          }}
          onMouseLeave={() => {
            setPopup({x: 0, y: 0});
            setHoveredIndex(null);
          }}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
