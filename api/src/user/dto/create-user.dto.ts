import { CreateBaseDto } from "../../base/dto/create-base.dto";
import { IsEmail, IsNotEmpty, Length } from 'class-validator';


export class CreateUserDto extends CreateBaseDto{
    
    @IsNotEmpty()
    @Length(10)
    username: string;
    
    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
