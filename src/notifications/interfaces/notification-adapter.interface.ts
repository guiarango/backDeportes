import { Mail } from './mail.interface';

export interface NotificationAdapter {
  sendNotification(options: Mail): void;
}
