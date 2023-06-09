import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UfModule } from './app/uf/uf.module';
import { dataSourceOptions } from './database/data-souce';
import { CityModule } from './app/city/city.module';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { ItemModule } from './app/item/item.module';
import { SupplierModule } from './app/supplier/supplier.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UfModule,
    CityModule,
    UserModule,
    AuthModule,
    ItemModule,
    SupplierModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
