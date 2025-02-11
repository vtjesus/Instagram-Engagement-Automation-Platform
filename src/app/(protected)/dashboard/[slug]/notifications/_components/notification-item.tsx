import { Button } from "@/components/ui/button";
import { useNotificationsMutation } from "@/hooks/use-notifications";
import { Notification } from "@prisma/client";
import { Link2, Loader, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  notification: Notification;
};

const NotificationItem = ({ notification }: Props) => {
  const router = useRouter();
  const { deleteMutation, isDeleting, isMarking, markAsSeen } =
    useNotificationsMutation(notification.id);

  return (
    <div
      key={notification.id}
      className={cn(
        "group bg-[#1C1C1C] hover:bg-[#252525] transition-colors border border-gray-800 hover:border-gray-700 rounded-lg p-4",
        isDeleting && "opacity-50"
      )}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-medium text-gray-200">
              {notification.content}
            </h3>
            {!notification.isSeen && (
              <button
                onClick={() =>
                  markAsSeen(
                    { id: notification.id },
                    {
                      onSuccess: () => {
                        router.refresh();
                      },
                    }
                  )
                }
                disabled={isMarking}
                className="px-2 py-0.5 text-[10px] font-medium bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-full transition-colors"
              >
                {isMarking ? (
                  <Loader className="animate-spin" size={12} />
                ) : (
                  "mark as read"
                )}
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mb-2">
            {format(
              new Date(notification.createdAt),
              "MMM d, yyyy 'at' h:mm a"
            )}
          </p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => {
              navigator.clipboard.writeText(notification.content);
              toast("Copied notification content.");
            }}
          >
            <Link2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => {
              deleteMutation(
                { id: notification.id },
                {
                  onSuccess: () => {
                    router.refresh();
                  },
                }
              );
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
