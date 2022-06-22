import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { UsersService } from './services';
import configuration from './services/config';
import { UsersController } from './users.controller';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
  ],
})
export class UsersModule {}
