import { faker } from '@faker-js/faker';
import { Request } from 'express';

import { ProfileService } from './profile.service';
import { ProfileModel } from '../entities/profile.entity';

jest.mock('../entities/profile.entity');

describe('ProfileService', () => {
    let profileService: ProfileService;

    beforeEach(() => {
        jest.clearAllMocks();

        profileService = new ProfileService();
    });

    describe('create', () => {
        it('should create a new profile', async () => {
            const body = {
                name: faker.string.alpha(),
                description: faker.string.alpha(),
                mbti: faker.string.alpha(),
                enneagram: faker.string.alpha(),
                variant: faker.string.alpha(),
                tritype: faker.number.int(),
                socionics: faker.string.alpha(),
                sloan: faker.string.alpha(),
                psyche: faker.string.alpha(),
                image: faker.string.alpha(),
            };

            const request = {
                body
            } as Request;

            const newProfile = {
                id: faker.string.uuid(),
                ...body
            };

            (ProfileModel.create as jest.Mock).mockResolvedValueOnce(newProfile);

            const output = await profileService.create(request);

            expect(output).toEqual({
                id: output.id,
                name: output.name
            });

            expect((ProfileModel.create as jest.Mock)).toHaveBeenCalled();
        });
    });
});
