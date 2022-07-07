import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

    @ApiProperty({
        example: 'batman@gmail.com',
        description: 'Email do usuário',
    })
    email: string;

    @ApiProperty({
        example: '123456',
        description: 'Senha do usuário',
    })
    password: string;
}