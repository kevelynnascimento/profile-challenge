import mongoose, { Schema, Document } from 'mongoose';

export interface IProfileEntity extends Document {
    id: string;
    name: string;
    description: string;
    mbti: string;
    enneagram: string;
    variant: string;
    tritype: number,
    socionics: string;
    sloan: string;
    psyche: string;
    image: string;
}

const profileEntitySchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    mbti: { type: String, required: true },
    enneagram: { type: String, required: true },
    variant: { type: String, required: true },
    tritype: { type: Number, required: true },
    socionics: { type: String, required: true },
    sloan: { type: String, required: true },
    psyche: { type: String, required: true },
    image: { type: String, required: true },
});

const ProfileModel = mongoose.model<IProfileEntity>('profile', profileEntitySchema);

export { ProfileModel };