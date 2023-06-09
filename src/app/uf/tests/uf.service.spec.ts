import { Test, TestingModule } from '@nestjs/testing';
import { UfService } from '../uf.service';
import { ufMock } from './__mocks__/uf.mock';

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

  it('should return an array of cats', async () => {
    const result = [ufMock];

    jest.spyOn(service, 'findOne').mockRejectedValue(() => result);

    expect(await service.findAll()).toEqual(result);
  });
});
