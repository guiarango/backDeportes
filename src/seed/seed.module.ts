import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SportsModule } from 'src/sports/sports.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SportsModule, AuthModule],
})
export class SeedModule {}
