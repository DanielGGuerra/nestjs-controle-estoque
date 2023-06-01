import { Test, TestingModule } from '@nestjs/testing';
import { UfService } from '../uf.service';

describe('UfService', () => {
  let service: UfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UfService],
    }).compile();

    service = module.get<UfService>(UfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
