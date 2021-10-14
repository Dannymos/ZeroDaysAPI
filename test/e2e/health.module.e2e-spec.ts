import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/modules/appModule';
import { INestApplication } from '@nestjs/common';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('Healthy!');
  });
});
