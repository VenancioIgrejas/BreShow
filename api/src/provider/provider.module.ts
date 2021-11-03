import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderController } from './provider.controller';
import { Provider } from './entities/provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  controllers: [ProviderController],
  providers: [ProviderService]
})
export class ProviderModule {}
