import { onUserInfo } from "@/actions/user";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useMutationData } from "./use-mutation-data";
import {
  deleteNotification,
  markNotificationAsRead,
  getNotification,
} from "@/actions/notifications";

type Notification = {
  id: string;
  createdAt: Date;
  userId: string | null;
  isSeen: boolean;
  content: string;
  message: string;
};

type NotificationResponse = {
  status: number;
  data?: {
    notification: Notification[];
  };
  nextCursor: string | null;
};

export const useUserUnseenNotifications = () => {
  const { data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: onUserInfo,
  });
  return {
    notification: data?.data?.notification,
    status: data?.status,
  };
};

export const useNotifications = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<NotificationResponse>({
    queryKey: ["user-notifications"],
    queryFn: ({ pageParam }) =>
      getNotification(pageParam as string | undefined),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  });

  const notifications =
    data?.pages.flatMap((page: any) => page.data ?? []) ?? [];

  return {
    notifications: notifications as Notification[],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};

export const useNotificationsMutation = (notificationId: string) => {
  const { isPending: isDeleting, mutate: deleteMutation } = useMutationData(
    ["delete-notification"],
    () => deleteNotification(notificationId),
    "user-notifications",
    () => {},
    false
  );

  const { isPending: isMarking, mutate: markAsSeen } = useMutationData(
    ["read-notification"],
    () => markNotificationAsRead(notificationId),
    "user-notifications",
    () => {},
    false
  );

  return {
    markAsSeen,
    isDeleting,
    deleteMutation,
    isMarking,
  };
};
