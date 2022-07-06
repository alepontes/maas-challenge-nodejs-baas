import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

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

    @ApiProperty({
        example: '123456',
    })
    confirmPassword: string;
}
