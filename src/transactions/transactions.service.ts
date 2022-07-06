import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { AccountService } from 'src/account/account.service';
import { Account, AccountDocument } from 'src/account/schemas/account.schema';
import { Customer } from 'src/customers/entities/customer.entity';
import { CreateTransactionDto, CreateTransactionDto2 } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionDocument } from './schemas/transactions.schema';

@Injectable()
export class TransactionsService {

  constructor(
    private accountService: AccountService,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  ) { }

  async create(createTransactionDto: CreateTransactionDto2) {

    let authorized = true;
    let message = '';

    await createTransactionDto.from.populate('account');
    const fromAccount = createTransactionDto.from.account;
    if (authorized && !fromAccount) {
      authorized = false;
      message = 'Cliente não possui conta';
    }

    await createTransactionDto.to.populate('account');
    const toAccount = createTransactionDto.to.account;
    if (authorized && !toAccount) {
      authorized = false;
      message = 'Cliente de destino não possui conta';
    }

    const hasBalance = this.customerHasBalance(fromAccount, createTransactionDto.amount);
    if (authorized && !hasBalance) {
      authorized = false;
      message = 'Saldo insuficiente';
    }

    if (authorized) {
      await Promise.all([
        this.accountService.debitAccount(fromAccount, createTransactionDto.amount),
        this.accountService.creditAccount(toAccount, createTransactionDto.amount),
      ]);
    }

    const to = createTransactionDto.to.toJSON();
    const from = createTransactionDto.from.toJSON();
    delete to.account;

    const createdTransaction = new this.transactionModel({
      message,
      authorized,
      to,
      from,
      amount: createTransactionDto.amount,
    });

    return createdTransaction.save();
  }

  /**
   * Retorna true se o valor na conta de origem for maior que o valor enviado
   * @param account 
   * @param amount 
   * @returns 
   */
  customerHasBalance(account: Account, amount: number): boolean {
    return account.balance > amount;
  }

  findByAccount(account: Account | any) {
    return this.transactionModel.find({ 'from.account._id': account._id }).exec();
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
