import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProviderService {


  constructor(
    @InjectRepository(Provider) 
    private readonly providerRepository: Repository<Provider>,
  ){}

  async create(createProviderDto: CreateProviderDto) {

    const provider = new Provider(<Provider>{
      name: createProviderDto.name,
      cel: createProviderDto.cel,
      perPrice: createProviderDto.perPrice,
      info: createProviderDto.info
    })

    return await this.providerRepository.save(provider);
  }

  findAll() {
    return this.providerRepository.find();
  }

  findOne(id: string) {
    return this.providerRepository.getId(<Provider>{id: id});
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: string) {
    return this.providerRepository.delete({id: id});
  }
}
