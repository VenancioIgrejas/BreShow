import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderService } from 'src/provider/provider.service';
import { Provider } from 'src/provider/entities/provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product,Provider])],
  controllers: [ProductController],
  providers: [ProductService,ProviderService]
})
export class ProductModule {}
