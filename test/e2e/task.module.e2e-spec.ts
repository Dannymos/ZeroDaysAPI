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

  it('submit new task to /task should return 400 when invalid due date is provided (POST)', () => {
    const mockRequest = {
      title: 'test',
      description: 'description',
      duedate: 'asdddasss1 2:01:42',
      completed: false,
    };

    return request(app.getHttpServer())
      .post('/task')
      .send(mockRequest)
      .expect(400);
  });

  jest.setTimeout(30000);
  it('updating task should return 201 when provided task exists (PUT)', async () => {
    const mockPostRequest = {
      title: 'test',
      description: 'description',
      duedate: '10/14/2021 2:01:42',
    };

    const existingTask = await request(app.getHttpServer())
      .post('/task')
      .send(mockPostRequest).then((response) => JSON.parse(response.text));

    const mockPutRequest = {
      id: existingTask.id,
      title: 'test',
      description: 'description',
      duedate: '10/14/2021 2:01:42',
      completed: false,
    };

    return request(app.getHttpServer())
      .put('/task')
      .send(mockPutRequest)
      .expect(200);
  });

  it('updating task should return 404 when provided task does not exist (PUT)', () => {
    const mockRequest = {
      id: 'e5d893cb-3005-4e2b-b6d4-3cb938ed782e',
      title: 'test',
      description: 'description',
      duedate: '10/14/2021 2:01:42',
      completed: false,
    };

    return request(app.getHttpServer())
      .put('/task')
      .send(mockRequest)
      .expect(404);
  });

  it('fetching task should return 200 given it exists (GET)', async () => {
    const mockPostRequest = {
      title: 'test',
      description: 'description',
    };

    const existingTask = await request(app.getHttpServer())
      .post('/task')
      .send(mockPostRequest).then((response) => JSON.parse(response.text));

    return request(app.getHttpServer())
      .get(`/task/${existingTask.id}`)
      .send()
      .expect(200);
  });

  it('fetching task with children should return 200 given it exists (GET)', async () => {
    const mockPostRequest = {
      title: 'test',
      description: 'description',
    };

    const existingTask = await request(app.getHttpServer())
      .post('/task')
      .send(mockPostRequest).then((response) => JSON.parse(response.text));

    return request(app.getHttpServer())
      .get(`/task/${existingTask.id}/children`)
      .send()
      .expect(200);
  });

  it('fetching task should return 404 given it does not exists (GET)', async () => request(app.getHttpServer())
    .get('/task/e5d893cb-3005-4e2b-b6d4-3cb938ed782e')
    .send()
    .expect(404));

  it('fetching task should return 400 when invalid uuid is provided (GET)', async () => request(app.getHttpServer())
    .get('/task/aninvalidid')
    .send()
    .expect(400));
});
