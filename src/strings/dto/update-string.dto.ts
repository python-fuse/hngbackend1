import { PartialType } from '@nestjs/mapped-types';
import { CreateStringDto } from './create-string.dto';

export class UpdateStringDto extends PartialType(CreateStringDto) {}
