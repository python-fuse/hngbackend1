import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { StringsService } from './strings.service';
import { CreateStringDto } from './dto/create-string.dto';
import { StringFilter } from 'src/utils/definitions';

@Controller('strings')
export class StringsController {
  constructor(private readonly stringsService: StringsService) {}

  @Post()
  create(@Body() createStringDto: CreateStringDto) {
    console.log('hi:', createStringDto);
    return this.stringsService.create(createStringDto);
  }

  @Get()
  findFiltered(
    @Query('is_palindrome') is_palindrome: boolean,
    @Query('min_length') min_length: number,
    @Query('max_length') max_length: number,
    @Query('word_count') word_count: number,
    @Query('contains_character') contains_character: string,
  ) {
    return this.stringsService.findFiltered({
      contains_character,
      is_palindrome,
      max_length,
      min_length,
      word_count,
    });
  }
  @Get('/filter-by-natural-language')
  filterByNaturalLanguage(@Query('query') query: string) {
    console.log(query);
  }

  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.stringsService.findOne(value);
  }
}
