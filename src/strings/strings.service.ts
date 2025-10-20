import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStringDto } from './dto/create-string.dto';
import { hash256 } from 'src/utils/utils';
import { StringFilter } from 'src/utils/definitions';

let database: CreateStringDto[] = [];

@Injectable()
export class StringsService {
  create(createStringDto: CreateStringDto) {
    if (!createStringDto.value) {
      throw new BadRequestException('String value is required');
    }

    if (typeof createStringDto.value !== 'string') {
      throw new UnprocessableEntityException('String value must be a string');
    }

    if (database.find((item) => item.value === createStringDto.value)) {
      throw new ConflictException('String value must be unique');
    }

    const sha256_hash = hash256(createStringDto.value);
    createStringDto.id = sha256_hash;
    createStringDto.value = createStringDto.value;
    createStringDto.created_at = new Date();
    createStringDto.properties = {
      length: createStringDto.value.length
        ? createStringDto.value.replaceAll(' ', '').length
        : 0,
      character_frequency_map: createStringDto.value
        .replaceAll(' ', '')
        .split('')
        .reduce(
          (acc, char) => {
            acc[char] = (acc[char] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),

      is_palindrome:
        createStringDto.value ===
        createStringDto.value.split('').reverse().join(''),

      unique_characters: new Set(
        createStringDto.value.replaceAll(' ', '').split(''),
      ).size,

      word_count:
        createStringDto.value.trim() === ''
          ? 0
          : createStringDto.value.split(' ').length,
      sha256_hash: sha256_hash,
    };

    database.push(createStringDto);
    return createStringDto;
  }

  findAll() {
    return database;
  }

  findFiltered(filter: StringFilter) {
    let matched: CreateStringDto[] = [];

    if (filter.contains_character?.length > 0) {
      matched = [
        ...matched,
        ...database.filter((item) =>
          item.value.includes(filter.contains_character),
        ),
      ];
    }

    if (filter.is_palindrome === true) {
      matched = [
        ...matched,
        ...database.filter(
          (item: CreateStringDto) => item.properties.is_palindrome === true,
        ),
      ];
    }

    if (filter.min_length !== undefined) {
      matched = [
        ...matched,
        ...database.filter(
          (item) => item.properties.length >= filter.min_length,
        ),
      ];
    }

    if (filter.max_length !== undefined) {
      matched = [
        ...matched,
        ...database.filter(
          (item) => item.properties.length <= filter.max_length,
        ),
      ];
    }

    if (filter.word_count > 0) {
      matched = [
        ...matched,
        ...database.filter(
          (item) => item.properties.word_count === filter.word_count,
        ),
      ];
    }

    const uniqueMatchedData = Array.from(new Set(matched).values());

    return {
      data: uniqueMatchedData,
      count: uniqueMatchedData.length,
      filters_applied: filter,
    };
  }

  findOne(stringValue: string) {
    const dbString = database.find((item) => item.value === stringValue);
    if (!dbString) {
      throw new NotFoundException('String not found');
    }
    return dbString;
  }

  remove(stringValue: string) {
    const index = database.findIndex((item) => item.value === stringValue);
    if (index === -1) {
      throw new NotFoundException('String not found');
    }
    database.splice(index, 1);
    return { message: 'String deleted successfully' };
  }
}
