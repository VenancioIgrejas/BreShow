import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('all')
  findAll(@Query('idUser') idUser: string) {
    return this.categoryService.findAll(idUser);
  }

  @Get()
  findOne(@Query('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch('edit')
  update(@Query('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete('delete')
  remove(@Query('id') id: string) {
    return this.categoryService.remove(id);
  }
}
