import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from './../src/auth/auth.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/profile (GET) unathorizin', async () => {
    return await request(app.getHttpServer())
      .get('/auth/profile?user=venancio')
      .expect(401);
  });

  it('/auth/profile (GET) with jwt', async () => {
    
    let jwtToken: string;

    const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send({user: {
                    username: 'venancio',
                    sub: 1
                  }})
                .expect(200);

    jwtToken = response.body.accessToken;
            
    return request(app.getHttpServer())
      .get('/auth/profile?user=venancio')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
            
  });

  afterAll(async () => {
    await app.close();
  });
});
