import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { StringsService } from './strings.service';
import { CreateStringDto } from './dto/create-string.dto';
import { StringFilter } from 'src/utils/definitions';
import { parseNlQ } from 'src/utils/utils';

@Controller('strings')
export class StringsController {
  constructor(private readonly stringsService: StringsService) {}

  @Post()
  create(@Body() createStringDto: CreateStringDto) {
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
    const parsedQuery: Partial<StringFilter> = parseNlQ(query);

    return this.stringsService.findFiltered(parsedQuery as StringFilter);
  }

  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.stringsService.findOne(value);
  }

  @Delete(':value')
  @HttpCode(204)
  remove(@Param('value') value: string) {
    return this.stringsService.remove(value);
  }
}
