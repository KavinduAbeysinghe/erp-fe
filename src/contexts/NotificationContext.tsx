import React, { createContext, useContext } from "react";
import { toast, ToastOptions } from "react-toastify";
import { Notification } from "../components/notification/Notification";

interface NotificationContextIn {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warn: (message: string, options?: ToastOptions) => void;
}

const NotificationContext = createContext<NotificationContextIn>(
  {} as NotificationContextIn,
);

export const NotificationContextProvider: React.FC<any> = (props: any) => {
  return (
    <NotificationContext.Provider value={toast}>
      {props.children}
      <Notification />
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextIn => {
  return useContext(NotificationContext);
};
