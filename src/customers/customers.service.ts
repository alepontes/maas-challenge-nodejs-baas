import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomersDocument } from './schemas/customers.schema';

@Injectable()
export class CustomersService {

  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomersDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(user: any, createCustomerDto: CreateCustomerDto) {
    // TODO: Confirmação de CPF

    const findedUser = await this.userModel.findById(user.id);
    const createdCustomer = new this.customerModel(createCustomerDto);
    const savedCustomer = await createdCustomer.save();

    await this.userModel.findByIdAndUpdate(user.id, {
      ...(findedUser.toJSON),
      customer: savedCustomer.toJSON(),
    });

    return savedCustomer;
  }

  findAll() {
    return this.customerModel.find();
  }

  findOne(id: string) {
    return this.customerModel.findById(id);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
