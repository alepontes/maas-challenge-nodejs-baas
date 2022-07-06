import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Customer } from 'src/customers/entities/customer.entity';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {

  @Prop()
  to: Customer;

  @Prop()
  from: Customer;

  @Prop()
  amount: number;

  @Prop()
  authorized: boolean;

  @Prop()
  message: string;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);