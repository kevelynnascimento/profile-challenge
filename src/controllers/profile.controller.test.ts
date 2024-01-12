import request from 'supertest';
import express, { Application } from 'express';
import { faker } from '@faker-js/faker';
import { Bootstraper } from '../';

describe('ProfileController', () => {
    let app: Application;

    beforeAll(() => {
        app = express();
        Bootstraper.start(app);
    });

    describe('POST /profiles', () => {
        it('should create a new profile', async () => {
            const body = {
                name: 'A Martinez',
                description: 'Adolph Larrue Martinez III.',
                mbti: 'ISFJ',
                enneagram: '9w3',
                variant: 'sp/so',
                tritype: 725,
                socionics: 'SEE',
                sloan: 'RCOEN',
                psyche: 'FEVL',
                image: 'https://soulverse.boo.world/images/1.png'
            };

            const response = await request(app)
                .post('/profiles')
                .send(body);

            expect(response.status).toBe(201);
        });
    });

    describe('GET /profiles', () => {
        it('should get all profiles', async () => {
            const response = await request(app).get('/profiles');

            expect(response.status).toBe(200);
        });
    });

    describe('GET /profiles/:id', () => {
        it('should get a profile by id', async () => {
            const id = faker.string.uuid();
            const response = await request(app).get(`/profiles/${id}`);

            expect(response.status).toBe(200);
        });
    });
});