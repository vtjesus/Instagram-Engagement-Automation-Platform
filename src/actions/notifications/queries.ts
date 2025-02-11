"use server";
import { client } from "@/lib/prisma";

export const getNotifications = async (userId: string, cursor?: string) => {
  return await client.notification.findMany({
    where: {
      userId,
    },
    take: 8,
    ...(cursor && {
      skip: 1,
      cursor: {
        id: cursor,
      },
    }),
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const deleteNotifications = async (notificationId: string) => {
  return await client.notification.delete({
    where: {
      id: notificationId,
    },
  });
};
export const markAsReadNotifications = async (notificationId: string) => {
  return await client.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      isSeen: true,
    },
  });
};

export const createNotifications = async (content: string, userId: string) => {
  return await client.notification.create({
    data: {
      content,
      userId,
    },
  });
};
