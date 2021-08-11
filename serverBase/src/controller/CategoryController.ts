import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";

import {BaseController} from "./BaseController";
import {Category} from "../entity/Category";

export class CategoryController extends BaseController{

    private categoryRepository = getRepository(Category);

    async all(request: Request, response: Response, next: NextFunction) {
        //Verifica se o usuario está authenticado
        this.verifyJWT(request, function(err, decoded){
            if(err) return response.status(500).json({ auth: false, message: err });
        });

        var UserId = this.getUserId(request);
        return this.categoryRepository.find({where:{"UserId":UserId}});
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.findOne(request.params.id,{ relations: ["User"] });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        //Verifica se o usuario está authenticado
        this.verifyJWT(request, function(err, decoded){
            if(err) return response.status(500).json({ auth: false, message: err });
        });

        var data = request.body;
        data.UserId = this.getUserId(request);

        var provider = new Category();
        
        provider.UserId = data.UserId;
        provider.name = data.name;
        
        return this.categoryRepository.save(provider)
                                    .then(obj => response.status(200).send({ message: 'Fornecedor Adicionado' }))
                                    .catch((err: any) => {
                                        response.status(500).send({ message: err })
                                    });

    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.categoryRepository.findOne(request.params.id);
        await this.categoryRepository.remove(userToRemove);
    }

}