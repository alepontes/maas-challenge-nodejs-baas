import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const CustomersSchema = SchemaFactory.createForClass(Customer);
