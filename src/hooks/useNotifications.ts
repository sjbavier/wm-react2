import { notification } from 'antd';
import { useCallback } from 'react';

interface INotifications {
  message: string;
  description?: string;
  duration?: number;
}

export default function useNotifications() {
  const setNotification = useCallback(
    ({ message, description = '', duration = 1.4 }: INotifications) => {
      notification.open({ message, description, duration });
    },
    []
  );
  return setNotification;
}
