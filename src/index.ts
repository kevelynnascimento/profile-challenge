
import 'reflect-metadata';
import express, { Application } from "express";
import cors from "cors";
import * as mongoose from 'mongoose';

import { RoutesUtil } from "./utils/routes.util";
import { MongoMemoryServer } from "mongodb-memory-server";

export class Bootstraper {
    public static async start(app: Application): Promise<void> {
        this.configureCors(app);
        this.startMongo();
        RoutesUtil.load(app);
    }

    public static configureCors(app: Application) {
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    }

    public static async startMongo() {
        const mongod = await MongoMemoryServer.create();

        const uri = mongod.getUri();

        mongoose.connect(uri);
    }
}
