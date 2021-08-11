import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { Request, Response } from "express";
import { Routes } from "./routes";

import { Category } from "./entity/Category";
import { Product } from "./entity/Product";
import { Provider } from "./entity/Provider";



createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(cors());
    app.options('*', cors());
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3001);

    console.log("Express server has started on port 3001. Open http://localhost:3001/users to see results");

}).catch(error => console.log(error));
