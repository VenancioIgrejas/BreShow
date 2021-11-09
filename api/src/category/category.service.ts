import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}


   async create(createCategoryDto: CreateCategoryDto) {
    
    const category = new Category(<Category>{
      idUser: createCategoryDto.idUser,
      name: createCategoryDto.name
    });

    return await this.categoryRepository.save(category);
  }

  findAll(idUser: string) {
    return this.categoryRepository.find({ where: { idUser: idUser}});
  }

  findOne(id: string) {
    return this.categoryRepository.getId(<Category>{id: id});
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id,<Category>{
      name: updateCategoryDto.name
    });
  }

  remove(id: string) {
    return this.categoryRepository.delete({id: id});
  }
}
