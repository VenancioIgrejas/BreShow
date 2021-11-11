import { CreateBaseDto } from "../../base/dto/create-base.dto";
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateProductDto extends CreateBaseDto{
    @IsNotEmpty()
    @Length(0,100)
    idUser: string;

    @IsNotEmpty()
    @Length(0,100)
    name: string;

    @Length(0,100)
    providerId: string;
    
    @Length(0,100)
    categoryId: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    quantity: number;
    
    @IsNotEmpty()
    dateIn: Date;

    @Length(0,100)
    comment: string;
}
