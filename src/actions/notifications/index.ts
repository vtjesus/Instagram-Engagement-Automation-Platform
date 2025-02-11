"use server";
import { onCurrentUser, onUserInfo } from "../user";
import {
  createNotifications,
  deleteNotifications,
  getNotifications,
  markAsReadNotifications,
} from "./queries";

export const getNotification = async (cursor?: string) => {
  try {
    const userInfo = await onUserInfo();
    if (!userInfo.data) {
      return { status: 401 };
    }
    const notifications = await getNotifications(userInfo.data.id, cursor);
    if (notifications)
      return {
        status: 200,
        data: notifications,
        nextCursor: notifications[7]?.id || null, // Get the last item's ID as next cursor
      };

    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};
export const deleteNotification = async (notificationId: string) => {
  await onCurrentUser();

  try {
    const notifications = await deleteNotifications(notificationId);
    if (notifications) return { status: 200, data: notifications };

    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};
export const markNotificationAsRead = async (notificationId: string) => {
  await onCurrentUser();

  try {
    const notifications = await markAsReadNotifications(notificationId);
    if (notifications) return { status: 200, data: notifications };

    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};
export const createNotification = async (content: string, userId: string) => {
  try {
    const notifications = await createNotifications(content, userId);
    if (notifications) return { status: 200, data: notifications };

    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};
