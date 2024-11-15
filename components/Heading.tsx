import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { PlusCircle } from "lucide-react";

interface HeadingProps {
  title: String;
  subtitle?: String;
  action: String;
  label?: String;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  action,
  label,
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h2 className="text-gray-500">{subtitle}</h2>
      </div>
      <div className="flex items-center">
        <Link href={`/${action}/new`} className={buttonVariants()}>
          <PlusCircle />
          {label}
        </Link>
      </div>
    </div>
  );
};

export default Heading;
