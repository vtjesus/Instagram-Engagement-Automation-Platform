import { deleteKeyword } from "@/actions/automations";
import { useEditKeyword } from "@/hooks/use-keyword";
import {
  useMutationData,
  useMutationDataState,
} from "@/hooks/use-mutation-data";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";

interface KeywordItemProps {
  word: {
    id: string;
    word: string;
  };
  automationId: string;
  //   isDeleting: boolean;
  //   onDelete: () => void;
}
const KeywordItemActive = ({
  automationId,
  //   isDeleting,
  //   onDelete,
  word,
}: KeywordItemProps) => {
  const { mutate: deleteMutation } = useMutationData(
    ["delete-keyword"],
    (data: { id: string }) => deleteKeyword(data.id),
    "automation-info"
  );
  const { latestVariable: latesDeleteVariable } = useMutationDataState([
    "delete-keyword",
  ]);
  const { EditContainer, isPending, currentValue } = useEditKeyword(
    automationId,
    word.id,
    word.word
  );
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2   text-white font-light py-1 px-4 rounded-full",
        latesDeleteVariable?.variables?.id === word.id &&
          "opacity-50 cursor-progress pointer-events-none ",
        isPending && "opacity-50 cursor-progress pointer-events-none "
      )}
    >
      <EditContainer>
        <p>{currentValue}</p>
      </EditContainer>
      <button
        onClick={() => {
          deleteMutation({ id: word.id });
        }}
      >
        <X size={16} className="text-[#3352CC] hover:text-[#1C2D70]" />
      </button>
    </div>
  );
};

export default KeywordItemActive;
