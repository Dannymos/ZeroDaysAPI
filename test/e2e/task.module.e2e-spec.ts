import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import TestUtilities from './utilities/test.utilities';
import AppModule from '../../src/modules/app.module';

describe('TaskModule (e2e)', () => {
  let app: INestApplication;
  let testingUtilities: TestUtilities;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
      providers: [
        TestUtilities,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    testingUtilities = app.get<TestUtilities>(TestUtilities);
  });

  beforeEach(async () => {
    await testingUtilities.loadFixtures();
  });

  it('submit new task to /task should return 201 (POST)', () => {
    const mockRequest = {
      title: 'test',
      description: 'description',
      duedate: '10/14/2021 2:01:42',
    };

    return request(app.getHttpServer())
      .post('/task')
      .send(mockRequest)
      .expect(201);
  });

  it('submit new task to /task should return 400 when invalid title is provided (POST)', () => {
    const mockRequest = {
      text: '',
      description: 'description',
      duedate: '10/14/2021 2:01:42',
    };

    return request(app.getHttpServer())
      .post('/task')
      .send(mockRequest)
      .expect(400);
  });

  it('updating task should return 404 when provided task does not exist (PUT)', () => {
    const mockRequest = {
      id: 'e5d893cb-3005-4e2b-b6d4-3cb938ed782e',
      description: 'description',
      duedate: '10/14/2021 2:01:42',
      completed: false,
    };

    return request(app.getHttpServer())
      .put('/task')
      .send(mockRequest)
      .expect(400);
  });

  it('submit new INVALID word to /word should return 400 (POST)', () => {
    const part = '12345678910';
    const mockRequest = {
      text: part.repeat(10),
      description: 'description',
      duedate: '10/14/2021 2:01:42',
      completed: false,
    };

    return request(app.getHttpServer())
      .post('/task')
      .send(mockRequest)
      .expect(400);
  });
});
