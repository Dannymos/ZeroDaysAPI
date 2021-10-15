import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import AppModule from '../../src/modules/app.module';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health (GET)', () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    request(app.getHttpServer()).get('/health').expect(200).expect('Healthy!'));
});
