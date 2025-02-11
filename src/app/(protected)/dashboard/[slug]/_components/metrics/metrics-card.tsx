"use client";
import { useParams } from "next/navigation";
import { useAnalytics } from "@/hooks/use-analytics";
import React from "react";

const MetricsCard = () => {
  const params = useParams();
  const { data: analytics, isLoading } = useAnalytics(params.slug as string);

  if (isLoading) {
    return (
      <div className="h-full flex lg:flex-row flex-col gap-5 items-end">
        {[
          { title: "Comments", subtitle: "On your posts" },
          { title: "Direct Messages", subtitle: "On your account" },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 border-[1px] flex flex-col gap-y-20 rounded-xl w-full lg:w-6/12"
          >
            <div>
              <h2 className="text-3xl text-white font-bold">{item.title}</h2>
              <p className="text-sm text-text-secondary">{item.subtitle}</p>
            </div>
            <div>
              <div className="h-9 w-24 bg-muted rounded-md animate-pulse" />
              <div className="h-5 w-48 bg-muted rounded-md mt-2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const { totalComments, totalDms } = analytics?.data || {
    totalComments: 0,
    totalDms: 0,
  };

  return (
    <div className="h-full flex lg:flex-row flex-col gap-5 items-end">
      {[
        { title: "Comments", value: totalComments },
        { title: "Direct Messages", value: totalDms },
      ].map((item, i) => (
        <div
          key={i}
          className="p-5 border-[1px] flex flex-col gap-y-20 rounded-xl w-full lg:w-6/12"
        >
          <div>
            <h2 className="text-3xl text-white font-bold">{item.title}</h2>
            <p className="text-sm text-text-secondary">
              {i === 0 ? "On your posts" : "On your account"}
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">100%</h3>
            <p className="text-sm text-text-secondary">
              {item.value} out of {item.value} {i === 0 ? "comments" : "DMs"}{" "}
              replied
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCard;
