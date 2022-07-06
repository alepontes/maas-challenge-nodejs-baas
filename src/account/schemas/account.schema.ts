import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Customer } from 'src/customers/entities/customer.entity';
import { Transaction } from 'src/transactions/schemas/transactions.schema';

export type AccountDocument = Account & Document;

@Schema()
export class Account {

  @Prop()
  number: string;
  
  @Prop()
  agency: number;
  
  @Prop()
  bank: string;
  
  @Prop()
  type: string;

  @Prop()
  balance: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Transactions' })
  transactions: [Transaction]
}

export const AccountSchema = SchemaFactory.createForClass(Account);
