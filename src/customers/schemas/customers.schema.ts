import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Account } from 'src/account/entities/account.entity';

export type CustomersDocument = Customer & Document;

// TODO: add Address, Roles e Account

@Schema()
export class Customer {

  @Prop()
  fristName: string;

  @Prop()
  lastName: string;

  @Prop()
  acceptedTerms: boolean;

  @Prop()
  document: string;

  @Prop()
  phoneNumber: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: Account;
}

export const CustomersSchema = SchemaFactory.createForClass(Customer);