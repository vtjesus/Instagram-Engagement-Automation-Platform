"use client";
import { Button } from "@/components/ui/button";
import {
  useUserUnseenNotifications,
  useNotifications,
} from "@/hooks/use-notifications";
import { Bell, Loader, ChevronRight, Navigation } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import NotificationItem from "../notification-item";

export const Notifications = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { notification } = useUserUnseenNotifications();
  const { notifications, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotifications();

  const unSeenNotification = notification?.filter((n) => n.isSeen == false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-white rounded-full py-6 relative">
          <Bell color="#3352CC" fill="#3352CC" />
          {unSeenNotification && unSeenNotification?.length > 0 ? (
            <span className="absolute text-white font-semibold bg-blue-800 -top-2 -left-3 size-7 flex items-center justify-center rounded-full">
              {unSeenNotification?.length}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] shadow-border rounded-md p-0 shadow-md border border-border bg-background">
        <div className="flex items-center justify-between p-4 bg-muted">
          <h3 className="font-semibold text-lg text-foreground">
            Notifications
          </h3>
          <Button
            variant="ghost"
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={() => router.push(`/dashboard/${slug}/notifications`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </Button>
        </div>
        <div className="scrollbar-thumb overflow-y-auto max-h-[350px] min-h-[95px]">
          <div className=" bg-black space-y-0.5">
            {notifications?.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No notifications yet
              </div>
            ) : (
              <>
                {notifications?.map((notification) => (
                  <NotificationItem
                    notification={notification}
                    key={notification.id}
                  />
                ))}
                {hasNextPage && (
                  <Button
                    variant="ghost"
                    className="w-full text-muted-foreground hover:text-foreground font-medium h-12"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? (
                      <Loader size={16} className="animate-spin" />
                    ) : (
                      "Load more"
                    )}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
