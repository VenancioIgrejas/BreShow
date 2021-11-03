import { CreateBaseDto } from "../../base/dto/create-base.dto";
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateProviderDto extends CreateBaseDto{
    
    @IsNotEmpty()
    @Length(0,100)
    name: string;
    
    @IsNotEmpty()
    perPrice: number;
    
    @Length(0,30)
    cel: string;

    @Length(0,100)
    info: string;
}
