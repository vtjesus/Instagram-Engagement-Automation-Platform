"use client";

import React from "react";
import ClerkAuthState from "@/components/global/clerk-auth-state";
import Sheet from "@/components/global/sheet";
import Items from "@/components/global/sidebar/items";
import UpgradeCard from "@/components/global/sidebar/upgrade";
import { SubscriptionPlan } from "@/components/global/subscription-plan";
import { Separator } from "@/components/ui/separator";
import { HelpDuoToneWhite, Warning } from "@/icons";
import { LogoSmall } from "@/svgs/logo-small";
import { Menu } from "lucide-react";
import { usePaths } from "@/hooks/use-nav";

const HamburgerMenu = ({ slug }: { slug: string }) => {
  return (
    <span className="lg:hidden flex items-center flex-1 gap-x-2">
      <Sheet trigger={<Menu />} className="lg:hidden" side="left">
        <div className="flex flex-col gap-y-5 w-full h-full p-3 bg-[#0e0e0e] bg-opacity-90 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl">
          <div className="flex gap-x-2 items-center p-5 justify-center">
            <LogoSmall />
          </div>
          <div className="flex flex-col py-3">
            <Items page={"automation"} slug={slug} />
          </div>
          <div className="px-16">
            <Separator orientation="horizontal" className="bg-[#333336]" />
          </div>
          <div className="px-3 flex flex-col gap-y-5">
            <div className="flex gap-x-2">
              <ClerkAuthState />
              <p className="text-[#9B9CA0]">Profile</p>
            </div>
            <div className="flex gap-x-3">
              <HelpDuoToneWhite />
              <p className="text-[#9B9CA0]">Help</p>
            </div>
          </div>
          <SubscriptionPlan type="FREE">
            <div className="flex-1 flex flex-col justify-end">
              <UpgradeCard />
            </div>
          </SubscriptionPlan>
        </div>
      </Sheet>
    </span>
  );
};

export default HamburgerMenu;
