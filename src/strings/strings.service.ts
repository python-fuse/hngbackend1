import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStringDto } from './dto/create-string.dto';
import { hash256 } from 'src/utils/utils';

let database: any = [];

@Injectable()
export class StringsService {
  create(createStringDto: CreateStringDto) {
    if (!createStringDto.value) {
      throw new BadRequestException('String value is required');
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

    return database.push(createStringDto);
  }

  findAll() {
    return database;
  }

  findOne(stringValue: string) {
    return database.find((item) => item.value === stringValue);
  }

  remove(stringValue: string) {
    return (database = database.filter((item) => item.value !== stringValue));
  }
}
