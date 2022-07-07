import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min } from "class-validator";
import { Customer } from "src/customers/schemas/customers.schema";

export class CreateTransactionDto {
  @ApiProperty({
    example: '123456789',
    description: 'Documento da conta de destino (funciona como uma chave PIX)',
  })
  @IsString({ message: 'Documento inválido' })
  document: string;

  @ApiProperty({
    example: 100,
    description: 'Valor que será enviado pelo cliente, deve ser positivo de 1 até 999999999 com até 2 casas decimais',
  })
  @Min(1)
  @Max(999999999)
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 2 })
  amount: number;
}

export class CreateTransactionDto2 {
  to: Customer & Document | any;
  from: Customer & Document | any;
  amount: number;
}
