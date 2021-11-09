import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post('add')
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Get('all')
  findAll(@Query('idUser') idUser: string) {
    return this.providerService.findAll(idUser);
  }

  @Get()
  findOne(@Query('id') id: string) {
    return this.providerService.findOne(id);
  }

  @Patch('edit')
  update(@Query('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providerService.update(id, updateProviderDto);
  }

  @Delete('delete')
  remove(@Query('id') id: string) {
    return this.providerService.remove(id);
  }
}
