import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { hash } from 'bcryptjs';
import { CustomersDocument } from 'src/customers/schemas/customers.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) { 
    // Verificar senha 
    // Verificar se email já cadastrado
    createUserDto.password = await hash(createUserDto.password, 10);
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async getCustomerByUserId(userId: string) {
    const user = await this.userModel.findById(userId).populate('customer');
    return user.customer
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return this.userModel.findById(id).populate('customer');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
