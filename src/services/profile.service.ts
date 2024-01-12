import { Request } from "express";
import { v4 as uuidv4 } from 'uuid';
import { IProfileEntity, ProfileModel } from "../entities/profile.entity";
import { IProfileGettingAllModel } from "../models/profile-getting-all.model";
import { IProfileCreationModel } from "../models/profile-creation.model";
import { IProfileGettingByIdModel } from "../models/profile-getting-by-id.model";

export class ProfileService {
    public async create(req: Request): Promise<IProfileCreationModel> {
        const { body } = req;

        const {
            name,
            description,
            mbti,
            enneagram,
            variant,
            tritype,
            socionics,
            sloan,
            psyche,
            image
        } = body;

        const profile = {
            id: uuidv4(),
            name,
            description,
            mbti,
            enneagram,
            variant,
            tritype,
            socionics,
            sloan,
            psyche,
            image
        } as IProfileEntity;

        const newProfile = await ProfileModel.create(profile);

        const response = {
            id: newProfile.id,
            name: newProfile.name
        };

        return response;
    }

    public async getAll(req: Request): Promise<IProfileGettingAllModel[]> {
        const { query } = req;

        const { page, limit } = query;

        const pageParam = +page ?? 1;
        const limitParam = +limit ?? 10;

        const profiles = await ProfileModel.find()
            .skip((pageParam - 1) * limitParam)
            .limit(limitParam);

        const response = profiles.map(({
            id,
            name,
            description,
            mbti,
            enneagram,
            variant,
            tritype,
            socionics,
            sloan,
            psyche,
            image }) => ({
                id,
                name,
                description,
                mbti,
                enneagram,
                variant,
                tritype,
                socionics,
                sloan,
                psyche,
                image
            }));

        return response;
    }

    public async getById(req: Request): Promise<IProfileGettingByIdModel> {
        const { params } = req;

        const { id } = params;

        const profile = await ProfileModel.findOne({ id: id });

        if (!profile)
            return null;

        const { name } = profile;

        const response = {
            id,
            name
        };

        return response;
    }
}