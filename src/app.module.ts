import { join } from 'path';

import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { SportsModule } from './sports/sports.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiVaildationSchema } from './config/joi.validation';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      load: [EnvConfiguration],
      validationSchema: JoiVaildationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    SportsModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
