import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {

    @ApiProperty({
        example: 'admin@admin.com',
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
}
