import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from '../auth/bcrypt/bcrypt.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: BcryptService
  ){}

  async create(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto)
    newUser.password = await this.hashService.cryptPasswordExternal(newUser.password);
    return this.userRepository.insert(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(username: string) {
    return this.userRepository.findOne({
      where:{
        username:username
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.userRepository.delete({id:id});
  }
}
