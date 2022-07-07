import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { hash } from 'bcryptjs';
import { CustomersDocument } from 'src/customers/schemas/customers.schema';
import { CustomException } from 'src/custom.exception';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto, defaultRole = 'customer') {

    if (createUserDto.password != createUserDto.confirmPassword) {
      throw new CustomException(['A confirmação de senha está incorreta'], 400);
    } 

    const existEmail = await this.userModel.findOne({ email: createUserDto.email });
    if (existEmail) {
      throw new CustomException(['Email já cadastrado'], 400);
    }

    createUserDto.password = await hash(createUserDto.password, 10);
    const createdUser = new this.userModel({ ...createUserDto, role: defaultRole });
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
    return this.userModel.find().populate('customer');
  }

  findOne(id: string) {
    return this.userModel.findById(id).populate('customer');
  }

  /**
   * Retorna True se o usuário tiver a role enviada
   */
  async userHasRoles(id: string, requiredRole: string[]): Promise<boolean> {

    const user = await this.userModel.findById(id);

    if (!user) {
      return false;
    }

    return requiredRole.some(role => role == user.role);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
