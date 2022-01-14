import HealthService from '../../../src/modules/health/providers/services/health.service';
import HealthController from '../../../src/modules/health/controllers/health.controller';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthService: HealthService;

  beforeAll(async () => {
    healthService = new HealthService();
    healthController = new HealthController(healthService);
  });

  describe('getHealth', () => {
    it('should return "Healthy!"', () => {
      jest
        .spyOn(healthService, 'getHealth')
        .mockImplementation(() => 'Healthy!');

      expect(healthController.getHealth()).toBe('Healthy!');
    });
  });
});
