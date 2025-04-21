import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationAdapter } from '../interfaces/notification-adapter.interface';
import { Mail } from '../interfaces';

@Injectable()
export class Mailer implements NotificationAdapter {
  constructor(private readonly mailerService: MailerService) {}

  public sendNotification(options: Mail): void {
    this.mailerService
      .sendMail({
        to: options.to,
        from: 'noreply@nestjs.com', //TODO se saca de config
        subject: options.subject,
        template: __dirname + options.template,
        context: options.context,
        // {
        //   // Data to be sent to template engine.
        //   code: 'cf1a3f828287',
        //   username: 'john doe',
        // },
      })
      .then(() => {})
      .catch(() => {});
  }
}
