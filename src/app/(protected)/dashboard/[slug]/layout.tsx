import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import InfoBar from "@/components/global/infobar";
import Sidebar from "@/components/global/sidebar";
import React, { ReactNode } from "react";
import {
  PrefetchUserAutomations,
  PrefetchUserNotifications,
  PrefetchUserProfile,
  PrefetchUserAnalytics,
} from "@/react-query/prefetch";

type Props = {
  children: ReactNode;
  params: { slug: string };
};

const Layout = async ({ children, params }: Props) => {
  const query = new QueryClient();

  await PrefetchUserProfile(query);

  await PrefetchUserAutomations(query);

  await PrefetchUserNotifications(query);

  await PrefetchUserAnalytics(query, params.slug);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="p-3">
        <Sidebar slug={params.slug} />
        <div
          className="
      lg:ml-[250px] 
      lg:pl-10 
      lg:py-5 
      flex 
      flex-col 
      overflow-auto
      "
        >
          <InfoBar slug={params.slug} />
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
