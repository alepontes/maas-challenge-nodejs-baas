import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersSchema } from './schemas/customers.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { AccountModule } from 'src/account/account.module';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AccountModule,
    TransactionsModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomersSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule { }
