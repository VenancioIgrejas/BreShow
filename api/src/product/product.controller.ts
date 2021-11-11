import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('all')
  findAll(@Query('idUser') idUser: string) {
    return this.productService.findAll(idUser);
  }

  @Get()
  findOne(@Query('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch('edit')
  update(@Query('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('delete')
  remove(@Query('id') id: string) {
    return this.productService.remove(id);
  }
}
