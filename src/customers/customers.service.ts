import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { AccountService } from 'src/account/account.service';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { Account } from 'src/account/entities/account.entity';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomersDocument } from './schemas/customers.schema';

@Injectable()
export class CustomersService {

  constructor(
    private accountService: AccountService,
    @InjectModel(Customer.name) private customerModel: Model<CustomersDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async create(user: any, createCustomerDto: CreateCustomerDto) {
    // TODO: Confirmação de CPF
    // TODO: Verificar se conta já existe

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

  async createAccount(user: any, id: string, createAccountDto: CreateAccountDto) {

    const findedCustomer = await this.customerModel.findOne({ user: user.id }).populate('account');

    if (findedCustomer.account) {
      return 'Cliente já possui conta';
    }

    if (!findedCustomer) {
      return 'Cliente não encontrado';
    }

    const account: any = await this.accountService.create(createAccountDto);

    await this.customerModel.findByIdAndUpdate(findedCustomer._id, { account: account.toJSON() });

    return account;
  }

  async findAccount(user: any, id: string, createAccountDto: CreateAccountDto) {

    const findedCustomer = await this.customerModel.findOne({ user: user.id }).populate('account');

    if (!findedCustomer.account) {
      return 'Cliente não possui conta';
    }

    return findedCustomer.account;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
