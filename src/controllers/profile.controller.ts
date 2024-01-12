import { Request, Response } from "express";
import Controller from "../utils/decorators/controller.decorator";
import { Get, Post } from "../utils/decorators/handlers.decorator";
import { ProfileService } from "../services/profile.service";
 
@Controller('/profiles')
export class ProfileController {
    private readonly profileService: ProfileService;

    constructor() {
        this.profileService = new ProfileService();
    }

    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const profile = await this.profileService.create(req);

            res.status(201).json(profile);
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    @Get('')
    public async getAll(req: Request, res: Response) {
        try {
            const profiles = await this.profileService.getAll(req);

            res.status(200).json(profiles);
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    @Get('/:id')
    public async getById(req: Request, res: Response) {
        try {
            const profile = await this.profileService.getById(req);

            res.status(200).json(profile);
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
}