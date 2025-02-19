import { Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportsController } from './sports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sport, SportSchema } from './entities/sport.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SportsController],
  providers: [SportsService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Sport.name, schema: SportSchema }]),
  ],
  exports: [MongooseModule],
})
export class SportsModule {}
