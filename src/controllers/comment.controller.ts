import { Request, Response } from "express";
import Controller from "../utils/decorators/controller.decorator";
import { Get, Post } from "../utils/decorators/handlers.decorator";
import { CommentService } from "../services/comment.service";

@Controller('/comments')
export class CommentController {
    private readonly commentService: CommentService;

    constructor() {
        this.commentService = new CommentService();
    }

    @Post('')
    public async create(req: Request, res: Response) {
        try {
            const comment = await this.commentService.create(req);

            res.status(201).json(comment);
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    @Get('')
    public async filter(req: Request, res: Response) {
        try {
            const comments = await this.commentService.filter(req);

            res.status(200).json(comments);
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    @Get('/:id')
    public async getById(req: Request, res: Response) {
        try {
            const comment = await this.commentService.getById(req);

            res.status(200).json(comment);
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    @Post('/:id/like')
    public async like(req: Request, res: Response) {
        try {
            const comment = await this.commentService.like(req);

            res.status(200).json(comment);
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    @Post('/:id/unlike')
    public async unlike(req: Request, res: Response) {
        try {
            const comment = await this.commentService.unlike(req);

            res.status(200).json(comment);
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }
}