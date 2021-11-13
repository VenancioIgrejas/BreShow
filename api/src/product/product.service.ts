import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) 
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ){}

  async create(createProductDto: CreateProductDto) {

    const provider = await this.providerRepository.findOne(createProductDto.providerId);
    const priceFinal = (1 - provider.perPrice/100.0) * createProductDto.quantity * createProductDto.price;

    const product = new Product(<Product>{
      idUser: createProductDto.idUser,
      name: createProductDto.name,
      price: createProductDto.price,
      priceTotal: createProductDto.price * createProductDto.quantity,
      priceFinal: priceFinal,
      quantity: createProductDto.quantity,
      comment: createProductDto.comment,
      dateIn: createProductDto.dateIn,
      provider: <Provider>{id: createProductDto.providerId},
      category: <Category>{id: createProductDto.categoryId}
    });

    return await this.productRepository.save(product);
    // return 'This action adds a new product';
  }

  findAll(idUser: string) {
    return this.productRepository.find({
       relations: ['category','provider'],
       where: { idUser: idUser} 
      });
  }

  findOne(id: string) {
    return this.productRepository.getId(<Product>{id: id});
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const provider = await this.providerRepository.findOne(updateProductDto.providerId);
    const priceFinal = (1 - provider.perPrice/100.0) * updateProductDto.quantity * updateProductDto.price;

    return this.productRepository.save(<Product>{
      id: id,
      name: updateProductDto.name,
      price: updateProductDto.price,
      quantity: updateProductDto.quantity,
      priceTotal: updateProductDto.price * updateProductDto.quantity,
      priceFinal: priceFinal,
      comment: updateProductDto.comment,
      dateIn: updateProductDto.dateIn,
      provider: <Provider>{
        id: updateProductDto.providerId
      },
      category: <Category>{
        id: updateProductDto.categoryId
      }
    });
  }

  remove(id: string) {
    return this.productRepository.delete({id: id});
  }
}
