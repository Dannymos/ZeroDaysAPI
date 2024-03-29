import { Test, TestingModule } from '@nestjs/testing';
import HealthService from '../../../src/modules/health/providers/services/health.service';

describe('HealthService', () => {
  let healthService: HealthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();
    healthService = module.get<HealthService>(HealthService);
  });

  describe('getHealth', () => {
    it('should return "Healthy!"', () => {
      expect(healthService.getHealth()).toBe('Healthy!');
    });
  });
});
