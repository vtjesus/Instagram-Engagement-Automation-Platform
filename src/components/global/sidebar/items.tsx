import { SIDEBAR_MENU } from "@/constants/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  page: string;
  slug: string;
};

const Items = ({ page, slug }: Props) => {
  return SIDEBAR_MENU.map((item) => {
    const isHome = item.label === "home";
    const isActive = isHome ? page === slug : page === item.label;

    return (
      <Link
        key={item.id}
        href={`/dashboard/${slug}${isHome ? "" : `/${item.label}`}`}
        className={cn(
          "capitalize flex gap-x-2 rounded-full p-3",
          isActive ? "bg-slate-700 " : "text-[#9B9CA0]"
        )}
      >
        {item.icon}
        {item.label}
      </Link>
    );
  });
};

export default Items;
