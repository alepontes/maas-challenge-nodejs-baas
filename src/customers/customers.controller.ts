import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/schemas/user.schema';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Post()
  async create(@Request() req, @Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(req.user, createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Post(':id/accounts')
  createAccount(@Request() req, @Param('id') id: string, @Body() createAccountDto: CreateAccountDto) {
    return this.customersService.createAccount(req.user, id, createAccountDto);
  }

  @Get(':id/accounts')
  findAccount(@Request() req, @Param('id') id: string, @Body() createAccountDto: CreateAccountDto) {
    return this.customersService.findAccount(req.user, id, createAccountDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
