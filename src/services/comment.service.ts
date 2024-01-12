import { Request } from "express";
import { ICommentCreationModel } from "../models/comment-creation.model";
import { v4 as uuidv4 } from 'uuid';
import { CommentModel, ICommentEntity, Like } from "../entities/comment.entity";
import { ICommentFilteringModel } from "../models/comment-filtering.model";
import { ICommentGettingByIdModel } from "../models/comment-getting-by-id.model";
import { ICommentLikeModel } from "../models/comment-like.model";
import { ICommentUnlikeModel } from "../models/comment-unlike.model";

export class CommentService {
    public async create(req: Request): Promise<ICommentCreationModel> {
        const { body } = req;

        const {
            title,
            description,
            mbti,
            enneagram,
            zodiac,
            commentCreatorProfileId,
            votedProfileId
        } = body;

        const comment = {
            id: uuidv4(),
            title,
            description,
            mbti,
            enneagram,
            zodiac,
            creationDate: new Date(),
            numberOfLikes: 0,
            likes: [],
            commentCreatorProfileId,
            votedProfileId
        } as ICommentEntity;

        const newComment = await CommentModel.create(comment);

        const response = {
            id: newComment.id,
            title: newComment.title,
            description: newComment.description
        };

        return response;
    }

    public async filter(req: Request): Promise<ICommentFilteringModel[]> {
        const { query } = req;

        const { page, limit, votedProfileId, mbti, enneagram, zodiac, sortBy } = query;

        const queryFilter: any = {};

        if (votedProfileId)
            queryFilter.votedProfileId = votedProfileId;

        if (mbti)
            queryFilter.mbti = mbti;

        if (enneagram)
            queryFilter.enneagram = enneagram;

        if (zodiac)
            queryFilter.zodiac = zodiac;

        const sortFilter: any = sortBy === 'numberOfLikes'
            ? { numberOfLikes: -1 }
            : { creationDate: -1 };

        const pageParam = +page ?? 1;
        const limitParam = +limit ?? 10;

        const profiles = await CommentModel.find(queryFilter)
            .sort(sortFilter)
            .skip((pageParam - 1) * limitParam)
            .limit(limitParam);

        const response = profiles.map(({ id, title, description, mbti, enneagram, zodiac, numberOfLikes }) => ({ id, title, description, mbti, enneagram, zodiac, numberOfLikes }));

        return response;
    }

    public async getById(req: Request): Promise<ICommentGettingByIdModel> {
        const { params } = req;

        const { id } = params;

        const comment = await CommentModel.findOne({ id: id });

        if (!comment)
            return null;

        const { title, description, mbti, enneagram, zodiac, numberOfLikes } = comment;

        const response = {
            id,
            title,
            description,
            mbti,
            enneagram,
            zodiac,
            numberOfLikes
        };

        return response;
    }

    public async like(req: Request): Promise<ICommentLikeModel> {
        const { params, body } = req;

        const { id } = params;

        const { profileId } = body;

        const comment = await CommentModel.findOne({ id: id });

        if (!comment) {
            return {
                success: false
            };
        }

        const alreadyLiked = comment.likes?.some(like => like.profileId === profileId);

        if (!alreadyLiked) {
            const newLike = {
                id: uuidv4(),
                profileId: profileId
            };

            comment.likes.push(newLike);
            comment.numberOfLikes++;

            try {
                await comment.save();
            } catch (error) {
                console.error('Error updating comment:', error);
            }
        }

        const response = {
            success: true
        };

        return response;
    }

    public async unlike(req: Request): Promise<ICommentUnlikeModel> {
        const { params, body } = req;

        const { id } = params;

        const { profileId } = body;

        const comment = await CommentModel.findOne({ id: id });

        if (!comment) {
            return {
                success: false
            };
        }

        const alreadyLiked = comment.likes?.some(like => like.profileId === profileId);

        console.log("alreadyLiked", alreadyLiked)

        if (alreadyLiked) {

            console.log("likes", comment.likes)

            comment.likes = comment.likes.filter(like => like.profileId !== profileId);

            console.log("likes", comment.likes)

            console.log("numberOfLikes", comment.numberOfLikes)
            comment.numberOfLikes--;
            console.log("numberOfLikes", comment.numberOfLikes)
            await comment.save();
        }

        const response = {
            success: true
        };

        return response;
    }
}