import { useState, useEffect } from "react";
import { generateTenantApi } from "@/utils/request/TenantApi";
import Cookies from "js-cookie";
import { TENANT_ID } from "@/utils/constants/constants";
import { NotificationResponseTypes } from "../types/notification.types";

export const useNotificationRules = () => {
  const [notifications, setNotifications] = useState<
    NotificationResponseTypes[]
  >([]);

  const fetchNotifications = async () => {
    const API = generateTenantApi(String(Cookies.get(TENANT_ID))); // Generate tenant-specific Axios instance

    try {
      const response = await API.get<NotificationResponseTypes[]>(
        "rules/notifs"
      );
      setNotifications(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  return { notifications };
};
