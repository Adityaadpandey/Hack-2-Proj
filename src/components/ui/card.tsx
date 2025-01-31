import { cn } from "@/lib/utils";
import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-700 bg-gray-800 shadow-md p-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
};
