import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    public hash: string;
    public password: string;
    private salt = 10 as number;

    validatePassword(){
        if(!this.password) throw new Error("password is undefined");
    }

    validate(){
        this.validatePassword();
        if(!this.hash) throw new Error("hash is undefined");
    }

    async cryptPassword(){
        this.validatePassword();
        return await bcrypt.hash(this.password,this.salt);
    }

    async cryptPasswordExternal(password: string){
        return await bcrypt.hash(password,this.salt);
    }
    
    async getSalt(){
        return await bcrypt.genSalt();
    }

    async compareHashPassword(){
        this.validate();
        return await bcrypt.compare(this.password,this.hash);
    }

}
