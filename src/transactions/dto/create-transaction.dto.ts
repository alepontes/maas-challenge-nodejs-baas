import { ApiProperty } from "@nestjs/swagger";
import { Customer } from "src/customers/schemas/customers.schema";

export class CreateTransactionDto {
  @ApiProperty({
    example: '123456789',
    description: 'Documento da conta de destino (funciona como uma chave PIX)',
  })
  document: string;

  @ApiProperty({
    example: 100,
    description: 'Valor que será enviado pelo cliente que fez a requisição',
  })
  amount: number;
}

export class CreateTransactionDto2 {
  to: Customer & Document | any;
  from: Customer & Document | any;
  amount: number;
}
