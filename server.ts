import express, { Application } from "express";
import { Bootstraper } from './src';

(() => {
    const app: Application = express();

    Bootstraper.start(app);

    const port = 3000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
})();