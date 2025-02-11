"use client";

import { useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { Link2, ChevronDown, Loader, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Notification } from "@prisma/client";
import NotificationItem from "./_components/notification-item";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const { notifications, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useNotifications();

  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const sortedNotifications = [...(notifications || [])].sort((a, b) => {
    return sortOrder === "desc"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <div className="min-h-screen text-white ">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-7  ">
          <Select
            value={sortOrder}
            onValueChange={(value: "asc" | "desc") => setSortOrder(value)}
          >
            <SelectTrigger className="w-[180px] bg-transparent border-gray-800">
              <div className="flex items-center">
                <ChevronDown className="mr-2 h-4 w-4" />
                <span>Sort by Date</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest first</SelectItem>
              <SelectItem value="asc">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {sortedNotifications && sortedNotifications.length > 0 ? (
            sortedNotifications.map((notification: Notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              No notifications found.
            </div>
          )}
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
        </div>
      </div>
    </div>
  );
}
