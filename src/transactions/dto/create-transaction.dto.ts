import { Customer } from "src/customers/schemas/customers.schema";

export class CreateTransactionDto {
    document: string;
    amount: number;
}

export class CreateTransactionDto2 {
  to:  Customer & Document | any;
  from:  Customer & Document | any;
  amount: number;
}
