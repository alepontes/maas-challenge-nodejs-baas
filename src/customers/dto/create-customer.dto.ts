import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {

    @ApiProperty({
        example: 'Bruce',
        description: 'Primeiro nome do cliente',
    })
    @IsString({ message: 'Primeiro nome inválido' })
    fristName: string;

    @ApiProperty({
        example: 'Wayne',
        description: 'Sobrenome do cliente',
    })
    @IsString({ message: 'Sobrenome inválido' })
    lastName: string;
    
    @ApiProperty({
        example: true,
        description: 'Indica se o cliente aceitou os termos de serviço, deve ser `true` para cadastrar um cliente',
    })
    @IsBoolean({ message: 'Aceitação de termos inválido' })
    @Equals(true, { message: 'Aceite os termos para proseguir' })
    acceptedTerms: boolean;

    @ApiProperty({
        example: '123456789',
        description: 'Nomero de documento do cliente, servirá como uma chave PIX',
    })
    @IsString({ message: 'Documento inválido' })
    document: string;

    @ApiProperty({
        example: '(11)91234-1234',
        description: 'Numero de celular do cliente',
    })
    @IsString({ message: 'Numero de celular inválido' })
    phoneNumber: string;

    @ApiProperty({
        example: false,
        description: 'Indica se o cliente teve o numero de documento verificado, é alterada para true quando um arquivo é enviado para `POST /customers/:id/documents`',
    })
    @IsOptional()
    @IsBoolean()
    verifiedDocument: boolean;
}
