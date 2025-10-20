import { Controller, Get, Post, Body } from '@nestjs/common';
import { StringsService } from './strings.service';
import { CreateStringDto } from './dto/create-string.dto';

@Controller('strings')
export class StringsController {
  constructor(private readonly stringsService: StringsService) {}

  @Post()
  create(@Body() createStringDto: CreateStringDto) {
    console.log('hi:', createStringDto);
    return this.stringsService.create(createStringDto);
  }

  @Get()
  findAll() {
    return this.stringsService.findAll();
  }
}
