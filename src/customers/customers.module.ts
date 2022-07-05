import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersSchema } from './schemas/customers.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomersSchema }, { name: User.name, schema: UserSchema }])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule { }
