import { InstagramBlue, PlaneBlue } from "@/icons";
import React from "react";
import KeywordItemActive from "./keyword-item-active";
import { LightbulbIcon } from "lucide-react";

type Props = {
  type: "DM" | "COMMENT" | "KEYWORDS";
  keywords?: {
    id: string;
    word: string;
    automationId: string | null;
  }[];
  automationId: string;
};

const ActiveTrigger = ({ keywords, type, automationId }: Props) => {
  return (
    <div className="bg-background-80 p-3 rounded-xl w-full">
      <div className="flex gap-x-2 items-center">
        {type === "COMMENT" ? (
          <InstagramBlue />
        ) : type === "KEYWORDS" ? (
          <LightbulbIcon size={16} color="#768BDD" />
        ) : (
          <PlaneBlue />
        )}
        <p className="text-lg">
          {type === "COMMENT"
            ? "User comments on my post."
            : type === "KEYWORDS"
            ? "If these keywords match"
            : "User sends me a direct message."}
        </p>
      </div>
      <p className="text-text-secondary">
        {type === "COMMENT"
          ? "Setup to listen for comments"
          : type === "KEYWORDS"
          ? "If the user send your a message/comment that contains a keyword, this automation will fire"
          : "Setup to listen for inbox"}
      </p>
      <div className="flex  gap-2 mt-5 flex-wrap">
        {type == "KEYWORDS" && keywords?.length == 0 ? (
          <span className="text-xs text-red-400">
            no key words found, please remove this automation and recreate one.
          </span>
        ) : (
          keywords?.map((word) => (
            <KeywordItemActive
              automationId={automationId}
              word={word}
              key={word.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveTrigger;
