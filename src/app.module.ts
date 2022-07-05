import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/modal'), UsersModule, CustomersModule, AuthModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
