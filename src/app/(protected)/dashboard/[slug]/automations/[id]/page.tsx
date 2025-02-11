import { getAutomationInfo } from "@/actions/automations";
import PostNode from "@/components/global/automations/post/node";
import ThenNode from "@/components/global/automations/then/node";
import Trigger from "@/components/global/automations/trigger";
import AutomationsBreadCrumb from "@/components/global/bread-crumbs/automations";
import { Warning } from "@/icons";

import { PrefetchUserAutomation } from "@/react-query/prefetch";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import React from "react";
import HamburgerMenu from "./_component.tsx/hamburger-menu";
import DeleteAutomationButton from "./_component.tsx/delete-automation-button";

type Props = {
  params: { id: string; slug: string };
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const info = await getAutomationInfo(params.id);
  return {
    title: info.data?.name,
  };
}

const Page = async ({ params }: Props) => {
  const query = new QueryClient();
  await PrefetchUserAutomation(query, params.id);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <section className="relative min-h-screen pb-24">
        <div className="flex flex-col items-center gap-y-20">
          <div className="flex w-full items-center justify-between">
            <HamburgerMenu slug={params.slug} />
            <AutomationsBreadCrumb id={params.id} />
          </div>
          <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
            <div className="flex gap-x-2">
              <Warning />
              When...
            </div>
            <Trigger id={params.id} />
          </div>
          <ThenNode id={params.id} />
          <PostNode id={params.id} />
        </div>
        <DeleteAutomationButton id={params.id} />
      </section>
    </HydrationBoundary>
  );
};

export default Page;
