import { Module } from '@nestjs/common';
import { ChoiceController } from './choice.controller';
import { ChoiceService } from './choice.service';

@Module({
  controllers: [ChoiceController],
  providers: [ChoiceService]
})
export class ChoiceModule {}
