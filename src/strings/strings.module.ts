import { Module } from '@nestjs/common';
import { StringsService } from './strings.service';
import { StringsController } from './strings.controller';

@Module({
  controllers: [StringsController],
  providers: [StringsService],
})
export class StringsModule {}
