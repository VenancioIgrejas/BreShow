import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {BaseController} from "./BaseController"

import {Provider} from "../entity/Provider";

export class ProviderController extends BaseController{

    private productRepository = getRepository(Provider);

    async all(request: Request, response: Response, next: NextFunction) {
        //Verifica se o usuario está authenticado
        this.verifyJWT(request, function(err, decoded){
            if(err) return response.status(500).json({ auth: false, message: err });
        });

        var UserId = this.getUserId(request);
        return this.productRepository.find({where:{"UserId":UserId}});
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.findOne(request.params.id,{ relations: ["User"] })
                            .catch((err: any) => {
                                    response.status(500).send({ message: err })
                                });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        
        //Verifica se o usuario está authenticado
        this.verifyJWT(request, function(err, decoded){
            if(err) return response.status(500).json({ auth: false, message: err });
        });

        var data = request.body;
        data.UserId = this.getUserId(request);

        var provider = new Provider();
        provider.UserId = data.UserId;

        provider.name = data.name;
        provider.info = data.info;
        provider.cel = data.cel;
        provider.per_price = data.per_price;
        
        return this.productRepository.save(provider)
                                    .then(obj => response.status(200).send({ message: 'Fornecedor Adicionado' }))
                                    .catch((err: any) => {
                                        response.status(500).send({ message: err })
                                    });
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.productRepository.findOne(request.params.id);
        await this.productRepository.remove(userToRemove);
    }

}