import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {

    @ApiProperty({
        example: 'Bruce',
        description: 'Primeiro nome do cliente',
    })
    fristName: string;

    @ApiProperty({
        example: 'Wayne',
        description: 'Sobrenome do cliente',
    })
    lastName: string;
    
    @ApiProperty({
        example: true,
        description: 'Indica se o cliente aceitou os termos de serviço',
    })
    acceptedTerms: boolean;

    @ApiProperty({
        example: '123456789',
        description: 'Nomero de documento do cliente, servirá como uma chave PIX',
    })
    document: string;

    @ApiProperty({
        example: '(11)91234-1234',
        description: 'Numero de celular do cliente',
    })
    phoneNumber: string;

    @ApiProperty({
        example: false,
        description: 'Indica se o cliente teve o numero de documento verificado, é alterada para true quando um arquivo é enviado para `POST /customers/:id/documents`',
    })
    verifiedDocument: boolean;
}
