import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class CreateAccountDto {
  @ApiProperty({
    example: 1000,
    description: 'Valor que a inicial da conta, deve ser positivo de 1 até 999999999 com até 2 casas decimais',
  })
  @Min(1)
  @Max(999999999)
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 2 })
  firstDeposit: number;
}
