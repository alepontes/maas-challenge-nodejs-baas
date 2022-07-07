import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateAccountDto } from './dto/create-account.dto';
// import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { AccountDocument } from './schemas/account.schema';
import { bank } from './constants';
// import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class AccountService {

  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) { }

  async create(createAccountDto: CreateAccountDto) {

    const account: Account = {
      number: this.generateNumberAccount(),
      agency: bank.agency,
      bank: `${bank.bankCode} - ${bank.corporateName}`,
      type: bank.type,
      balance: createAccountDto.firstDeposit || 0,
    }

    const createdAccount = new this.accountModel(account);
    return createdAccount.save();
  }

  private generateNumberAccount() {
    const num = this.getRandomArbitrary(10000, 99999);
    const digit = this.getRandomArbitrary(1, 9);
    return `${num}-${digit}`;
  }

  async findAll() {
    return this.accountModel.find();
  }

  findOne(id: string) {
    return this.accountModel.findById(id);
  }

  async creditAccount(account: Account | any, amount: number) {
    const newBalance = account.balance + amount;
    return this.accountModel.findByIdAndUpdate(account.id, { balance: newBalance });
  }

  async debitAccount(account: Account | any, amount: number) {
    const newBalance = account.balance - amount;
    return this.accountModel.findByIdAndUpdate(account.id, { balance: newBalance });
  }

  /**
   * Gera um numero aleatório entre 2 valores
   */
  getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
