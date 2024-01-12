import { MongoMemoryServer } from 'mongodb-memory-server';

export default class MongoMemoryConfig {
    private static mongoServer: MongoMemoryServer;

    static async start(): Promise<string> {
        this.mongoServer = new MongoMemoryServer();
        const mongoUri = await this.mongoServer.getUri();
        return mongoUri;
    }

    static async stop(): Promise<void> {
        if (this.mongoServer) {
            await this.mongoServer.stop();
        }
    }
}
