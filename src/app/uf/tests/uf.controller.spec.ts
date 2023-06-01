import { Test, TestingModule } from '@nestjs/testing';
import { UfController } from '../uf.controller';
import { UfService } from '../uf.service';

describe('UfController', () => {
  let controller: UfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UfController],
      providers: [UfService],
    }).compile();

    controller = module.get<UfController>(UfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
