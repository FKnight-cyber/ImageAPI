import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';

describe('App e2e testing', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('(POST) /image/save', () => {
    it('[201::CREATED] Should successfully save an image', async () => {
      const data = {
        image:
          'https://assets.storage.trakto.io/AkpvCuxXGMf3npYXajyEZ8A2APn2/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg',
        compress: 0.9,
      };
      const response = await request(app.getHttpServer())
        .post('/image/save')
        .send(data);

      expect(response.statusCode).toEqual(201);
      expect(response.body.localpath.original).toBe(
        `${process.env.FOLDER_PATH}/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg`,
      );
      expect(response.body.localpath.thumb).toBe(
        `${process.env.FOLDER_PATH}/0e406885-9d03-4c72-bd92-c6411fbe5c49_thumb.jpg`,
      );
    });
  });
});
