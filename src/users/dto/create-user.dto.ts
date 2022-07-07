import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {

    @ApiProperty({
        example: 'batman@gmail.com',
        description: 'Email do usuário',
    })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @ApiProperty({
        example: '123456',
        description: 'Senha do usuário',
    })
    @IsString({ message: 'Senha inválida' })
    password: string;

    @ApiProperty({
        example: '123456',
    })
    @IsString({ message: 'Confirmação de senha inválida' })
    confirmPassword: string;
}
