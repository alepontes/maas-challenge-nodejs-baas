import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query, QueryOptions } from 'mongoose';
import { AccountService } from 'src/account/account.service';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { Account } from 'src/account/entities/account.entity';
import { CreateTransactionDto, CreateTransactionDto2 } from 'src/transactions/dto/create-transaction.dto';
import { TransactionsService } from 'src/transactions/transactions.service';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomersDocument } from './schemas/customers.schema';

@Injectable()
export class CustomersService {

  constructor(
    private accountService: AccountService,
    private transactionsService: TransactionsService,
    private userService: UsersService,
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

  async verifyDocument(user, id: string, file: Express.Multer.File) {
    const customer: any = await this.userService.getCustomerByUserId(user.id);
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(customer.id, { verifiedDocument: true });
    return updatedCustomer;
  }

  async createAccount(user: any, id: string, createAccountDto: CreateAccountDto) {

    const findedCustomer: any = await this.userService.getCustomerByUserId(user.id);

    if (!findedCustomer) {
      return 'Cliente não encontrado';
    }

    const existAccount = await this.getAccountByCustomer(findedCustomer._id);
    if (existAccount) {
      return 'Cliente já possui conta';
    }

    const account: any = await this.accountService.create(createAccountDto);

    await this.customerModel.findByIdAndUpdate(findedCustomer._id, { account: account.toJSON() });

    return account;
  }

  async findAccount(user: any, id: string, createAccountDto: CreateAccountDto) {

    // TODO: Alterar para getCustomerByUserId
    const findedCustomer = await this.customerModel.findOne({ user: user.id }).populate('account');

    if (!findedCustomer.account) {
      return 'Cliente não possui conta';
    }

    return findedCustomer.account;
  }

  async createTransactions(user: any, id: string, createTransactionDto: CreateTransactionDto) {

    const fromCustomer: any = await this.userService.getCustomerByUserId(user.id);
    if (!fromCustomer) {
      return 'Cliente não encontado';
    }

    const toCustomer: any = await this.getCustomerByDocument(createTransactionDto.document);
    if (!toCustomer) {
      return 'Cliente de destino não encontrado';
    }

    if (toCustomer.document == fromCustomer.document) {
      return 'Não é possível fazer uma transferencia para a própria conta';
    }

    const createTransactionDto2: CreateTransactionDto2 = {
      to: toCustomer,
      from: fromCustomer,
      amount: createTransactionDto.amount,
    }

    const createdTransaction = await this.transactionsService.create(createTransactionDto2);
    return createdTransaction;
  }

  async findAllTransactions(user: any, id: string) {
    const customer = await this.userService.getCustomerByUserId(user.id);
    const account = await this.getAccountByCustomer(customer);
    return this.transactionsService.findByAccount(account);
  }

  async getCustomerByDocument(document: string) {
    return this.customerModel.findOne({ document });
  }

  async getAccountByCustomer(id) {
    const customer = await this.customerModel.findById(id).populate('account');
    return customer.account;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
