import { HealthController } from '../../../src/modules/healthmodule/controllers/HealthController';
import { HealthService } from '../../../src/modules/healthmodule/services/HealthService';

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
