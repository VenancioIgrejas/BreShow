import { CreateBaseDto } from "../../base/dto/create-base.dto";
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateProviderDto extends CreateBaseDto{
    
    @IsNotEmpty()
    @Length(10)
    name: string;
    
    @IsNotEmpty()
    perPrice: number;
    
    @Length(30)
    cel: string;

    @Length(100)
    info: string;
}
