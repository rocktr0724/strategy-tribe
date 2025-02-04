import { ReactNode } from 'react';

export interface ServerNotification {
  id: string;
  userId: string;
  message: string;
  type: string;
  createdAt: Date;
  read: boolean;
  url: string;
}

type CallableComponent = (onClose: () => void) => ReactNode | string;
export interface ClientNotification {
  icon?: string;
  title: string;
  content?: CallableComponent | string;
  style?: NotificationStyle;
}

export enum NotificationStyle {
  default,
  error,
  success,
  dark,
}

export interface iNotificationConfig {
  delayType: DelayType;
  delayTime: number;
  condition: boolean;
  type: NotificationType;
}

export enum DelayType {
  Time,
  Condition,
}

export enum NotificationType {
  Banner,
  Pill,
}
