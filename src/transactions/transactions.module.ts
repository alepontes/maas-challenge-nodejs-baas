import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { TransactionSchema } from './schemas/transactions.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [
    AccountModule,
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
  ],
  exports: [TransactionsService],
})
export class TransactionsModule { }
