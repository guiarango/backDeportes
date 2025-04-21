import { Module } from '@nestjs/common';

import { EnvConfiguration } from './config/env.config';
import { JoiVaildationSchema } from './config/joi.validation';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { SportsModule } from './sports/sports.module';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { NotificationsModule } from './notifications/notifications.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      load: [EnvConfiguration],
      validationSchema: JoiVaildationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      preview: true,
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    SportsModule,
    CommonModule,
    SeedModule,
    AuthModule,
    // NotificationsModule,
    FilesModule,
  ],
})
export class AppModule {}
