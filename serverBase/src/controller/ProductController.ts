import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Product } from "../entity/Product";

import { Category } from "../entity/Category";
import { Provider } from "../entity/Provider";
import { BaseController } from "./BaseController";


export class ProductController extends BaseController {

    private productRepository = getRepository(Product);
    private providerRepository = getRepository(Provider);
    private categoryRepository = getRepository(Category);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find({ relations: ["User", "Provider", "Category"] });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.findOne(request.params.id, { relations: ["User", "Provider", "Category"] });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        //Verifica se o usuario está authenticado
        this.verifyJWT(request, function (err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: err });
        });

        var data = request.body;
        data.UserId = this.getUserId(request);

        const product = new Product();
        product.name = data.name;
        product.UserId = data.UserId;
        product.comment = data.comment;
        product.price = data.price;
        product.quantity = data.quantity;
        product.date_in = data.date_in;

        return this.providerRepository.findOne(data.providerId)
            .then(provider => {
                product.Provider = provider;
                return this.categoryRepository.findOne(data.categoryId)
            })
            .then(category => {
                product.Category = category;
                return this.productRepository.save(product);
            })
            .then(p => response.status(200).send({ message: 'ok' }))
            .catch((err: any) => {
                response.status(500).send({ message: err })
            });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.productRepository.findOne(request.params.id);
        await this.productRepository.remove(userToRemove);
    }

    async allTable(request: Request, response: Response, next: NextFunction) {
        //Verifica se o usuario está authenticado
        this.verifyJWT(request, function (err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: err });
        });

        var userId = this.getUserId(request);
        
        return this.productRepository
                    .find({ where:{"UserId":userId},relations: ["Provider", "Category"] })
                    .catch((err: any) => {
                        response.status(500).send({ message: err })
                    });

        

    }

}