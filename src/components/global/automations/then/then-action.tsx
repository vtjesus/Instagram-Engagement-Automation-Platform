import { useListener } from "@/hooks/use-automations";
import React from "react";
import TriggerButton from "../trigger-button";
import { AUTOMATION_LISTENERS } from "@/constants/automation";
import { SubscriptionPlan } from "../../subscription-plan";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";
import { useQueryUser } from "@/hooks/user-queries";

type Props = {
  id: string;
};

const ThenAction = ({ id }: Props) => {
  const {
    onSetListener,
    listener: Listener,
    onFormSubmit,
    register,
    isPending,
  } = useListener(id);
  const { data } = useQueryUser();
  let isPro = data?.data?.subscription?.plan === "PRO";

  return (
    <TriggerButton label="Then">
      <div className="flex flex-col gap-y-2  ">
        {AUTOMATION_LISTENERS.map((listener) =>
          listener.type === "SMARTAI" ? (
            <button
              onClick={() => onSetListener(listener.type)}
              key={listener.id}
              disabled={!isPro}
              className={cn(
                "text-left",
                Listener === listener.type
                  ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]"
                  : "bg-background-80",
                "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100",
                !isPro && "cursor-not-allowed"
              )}
            >
              <div className="flex gap-x-2 items-center">
                {listener.icon}
                <p>{listener.label}</p>
              </div>
              {isPro ? (
                <p className="text-sm">{listener.description}</p>
              ) : (
                <p>(Upgrade to use this feature).</p>
              )}
            </button>
          ) : (
            <button
              onClick={() => onSetListener(listener.type)}
              key={listener.id}
              className={cn(
                "text-left",
                Listener === listener.type
                  ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]"
                  : "bg-background-80",
                "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
              )}
            >
              <div className="flex gap-x-2 items-center">
                {listener.icon}
                <p>{listener.label}</p>
              </div>
              <p className="text-sm">{listener.description}</p>
            </button>
          )
        )}
        <form onSubmit={onFormSubmit} className="flex flex-col gap-y-2">
          <Textarea
            placeholder={
              Listener === "SMARTAI"
                ? "Add a prompt that your smart ai can use..."
                : "Add a message you want send to your customers"
            }
            {...register("prompt")}
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Input
            disabled
            {...register("reply")}
            placeholder="Add a reply for comments (Unavailable)"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Button className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]">
            <Loader state={isPending}>Add listener</Loader>
          </Button>
        </form>
      </div>
    </TriggerButton>
  );
};

export default ThenAction;
