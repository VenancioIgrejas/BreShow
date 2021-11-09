import { CreateBaseDto } from "../../base/dto/create-base.dto";
import { IsEmail, IsNotEmpty, Length } from 'class-validator';


export class CreateCategoryDto extends CreateBaseDto{
    @IsNotEmpty()
    @Length(0,100)
    idUser: string;

    @IsNotEmpty()
    @Length(0,100)
    name: string;
}
