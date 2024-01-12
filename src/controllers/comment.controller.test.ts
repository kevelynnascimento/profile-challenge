import request from 'supertest';
import express, { Application } from 'express';
import { faker } from '@faker-js/faker';
import { Bootstraper } from '..';

describe('CommentController', () => {
    let app: Application;

    beforeAll(() => {
        app = express();
        Bootstraper.start(app);
    });

    describe('POST /comments', () => {
        it('should create a new comment', async () => {
            const body = {
                title: 'My feedback',
                description: 'description about my feedback',
                mbti: 'ISFJ',
                enneagram: '9w3',
                zodiac: 'Aries',
                commentCreatorProfileId: '8f053d70-5ee2-4376-8ec8-3dbfea0303ea',
                votedProfileId: '8f053d70-5ee2-4376-8ec8-3dbfea0303ea'
            };

            const response = await request(app)
                .post('/comments')
                .send(body);

            expect(response.status).toBe(201);
        });
    });

    describe('GET /comments', () => {
        it('should filter comments', async () => {
            const params = {
                page: '1',
                limit: '10',
                mbti: 'ISFJ',
                enneagram: '9w3',
                zodiac: 'Aries',
                sortBy: 'numberOfLikes',
                votedProfileId: faker.string.uuid()
            };

            const response = await request(app).get('/comments').query(params);

            expect(response.status).toBe(200);
        });
    });

    describe('GET /comments/:id', () => {
        it('should get a comments by id', async () => {
            const id = faker.string.uuid();
            const response = await request(app).get(`/comments/${id}`);

            expect(response.status).toBe(200);
        });
    });

    describe('POST /comments/:id/like', () => {
        it('should like the comment', async () => {
            const body = {
                profileId: faker.string.uuid()
            };

            const id = faker.string.uuid();

            const response = await request(app)
                .post(`/comments/${id}/like`)
                .send(body);

            expect(response.status).toBe(200);
        });
    });


    describe('POST /comments/:id/unlike', () => {
        it('should unlike the comment', async () => {
            const body = {
                profileId: faker.string.uuid()
            };

            const id = faker.string.uuid();

            const response = await request(app)
                .post(`/comments/${id}/unlike`)
                .send(body);

            expect(response.status).toBe(200);
        });
    });

});