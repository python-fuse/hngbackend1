import { Test, TestingModule } from '@nestjs/testing';
import { StringsController } from './strings.controller';
import { StringsService } from './strings.service';

describe('StringsController', () => {
  let controller: StringsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StringsController],
      providers: [StringsService],
    }).compile();

    controller = module.get<StringsController>(StringsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
