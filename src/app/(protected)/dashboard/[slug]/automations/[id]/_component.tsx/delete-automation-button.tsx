"use client";
import { Button } from "@/components/ui/button";
import { useDeleteAutomation } from "@/hooks/use-automations";
import useConfirm from "@/hooks/use-confirm";
import { Loader, TrashIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const DeleteAutomationButton = ({ id }: { id: string }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure to delete this automation?",
    "This action is irreversible"
  );
  const { isPending, mutate } = useDeleteAutomation(id);
  const params = useParams();

  const router = useRouter();
  const handleRemoveAutomation = async () => {
    const ok = await confirm();
    if (!ok) return;
    mutate(
      {},
      {
        onSuccess: () => {
          router.replace(`/dashboard/${params.slug}/automations`);
        },
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <Button
        disabled={isPending}
        variant={"outline"}
        onClick={handleRemoveAutomation}
        className="fixed w-14 h-14 bottom-6 rounded-full right-6 md:bottom-8 md:right-8 shadow-lg hover:shadow-xl transition-shadow duration-200 z-50"
      >
        {isPending ? (
          <Loader size={6} className="animate-spin" />
        ) : (
          <TrashIcon className="text-red-500 w-6 h-6" />
        )}
      </Button>
    </>
  );
};

export default DeleteAutomationButton;
