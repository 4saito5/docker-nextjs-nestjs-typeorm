import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessLogsService } from './access-logs.service';
import { AccessLog } from '../../../database/entities/access-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessLog]),
  ],
  providers: [AccessLogsService],
  exports: [
    TypeOrmModule,
    AccessLogsService,
  ],
})
export class AccessLogsModule {}
