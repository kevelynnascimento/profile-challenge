import express, { Application, Handler } from "express";
import { controllers } from "../controllers";
import { IRouter } from "./decorators/handlers.decorator";
import { MetadataKeys } from "./metadata.keys";

export class RoutesUtil {
    public static load(app: Application) {
        const info: any[] = [];

        controllers.forEach((controllerClass) => {
            const controllerInstance: { [handleName: string]: Handler } = new controllerClass() as any;
            const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, controllerClass);
            const routers: IRouter[] = Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass);

            const exRouter = express.Router();      

            routers?.forEach(({ method, path, handlerName }) => {
                exRouter[method](path, controllerInstance[String(handlerName)].bind(controllerInstance));

                info.push({ api: `${method.toLocaleUpperCase()}${basePath + path}`, handler: `${controllerClass.name}.${String(handlerName)}`, });
            });

            app.use(basePath, exRouter);
        });

        console.table(info);
    }
}