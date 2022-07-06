import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user: User = await this.usersService.getUserByEmail(email);

        if (!user) {
            return null;
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            return null;
        }

        return user;
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
