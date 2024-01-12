import { faker } from '@faker-js/faker';
import { Request } from 'express';
import { CommentService } from './comment.service';
import { CommentModel } from '../entities/comment.entity';

jest.mock('../entities/comment.entity');

describe('CommentService', () => {
    let commentService: CommentService;

    beforeEach(() => {
        jest.clearAllMocks();

        commentService = new CommentService();
    });

    describe('create', () => {
        it('should create a new comment', async () => {
            const body = {
                title: faker.string.alpha(),
                description: faker.string.alpha(),
                mbti: faker.string.alpha(),
                enneagram: faker.string.alpha(),
                zodiac: faker.string.alpha(),
                commentCreatorProfileId: faker.string.uuid(),
                votedProfileId: faker.string.uuid()
            };

            const request = {
                body
            } as Request;

            const newComment = {
                id: faker.string.uuid(),
                ...body,
                creationDate: faker.date.anytime(),
                numberOfLikes: faker.number.int(),
                likes: [],
            };

            (CommentModel.create as jest.Mock).mockResolvedValueOnce(newComment);

            const output = await commentService.create(request);

            expect(output).toEqual({
                id: output.id,
                title: output.title,
                description: output.description
            });

            expect((CommentModel.create as jest.Mock)).toHaveBeenCalled();
        });
    });
});
