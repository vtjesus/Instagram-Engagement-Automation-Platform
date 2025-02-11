"use client";

import { useMutationData } from "./use-mutation-data";
import { ReactNode, useEffect, useRef, useState } from "react";
import { editKeywords } from "@/actions/automations";
import { Input } from "@/components/ui/input";
import { useClickAway } from "@/hooks/use-click-away";

export const useEditKeyword = (
  automationId: string,
  keywordId: string,
  initialName: string
) => {
  const [editMode, setEditMode] = useState(false);
  const currentValue = useRef(initialName);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate, isPending } = useMutationData(
    ["update-keyword"],
    async (data: { name: string }) => {
      return await editKeywords(automationId, data.name, keywordId);
    },
    "automation-info"
  );

  useClickAway(containerRef, () => {
    if (editMode) {
      handleSave();
    }
  });

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editMode]);

  const handleSave = () => {
    const newValue = inputRef.current?.value || initialName;
    if (newValue.trim() !== initialName) {
      mutate(
        { name: newValue },
        {
          onSuccess: () => {
            setEditMode(false);
            currentValue.current = newValue;
          },
          onError: () => {
            setEditMode(false);
            if (inputRef.current) {
              inputRef.current.value = initialName;
            }
            currentValue.current = initialName;
          },
        }
      );
    } else {
      setEditMode(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setEditMode(false);
      if (inputRef.current) {
        inputRef.current.value = initialName;
      }
      currentValue.current = initialName;
    }
  };

  const EditContainer = ({ children }: { children: ReactNode }) => {
    return (
      <div
        ref={containerRef}
        onDoubleClick={() => {
          if (!isPending) {
            setEditMode(true);
          }
        }}
        className="relative"
      >
        {editMode ? (
          <Input
            ref={inputRef}
            defaultValue={currentValue.current}
            onKeyDown={handleKeyDown}
            className="p-2 bg-transparent ring-0 border-none outline-none field-sizing-content"
            disabled={isPending}
          />
        ) : (
          children
        )}
      </div>
    );
  };

  return {
    EditContainer,
    isEditing: editMode,
    isPending,
    currentValue: currentValue.current,
  };
};
