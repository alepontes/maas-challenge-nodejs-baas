import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateAccountDto } from 'src/account/dto/create-account.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { User } from 'src/users/schemas/user.schema';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('Customers')
@Controller('customers')
@ApiBearerAuth()
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

  @Post(':id/documents')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './storage',
      filename: (req: any, file, callback) => callback(null, `${req.user.id}${extname(file.originalname)}`) ,
    }),
  }))
  verifyDocument(@Request() req, @Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.customersService.verifyDocument(req.user, id, file);
  }

  @Post(':id/accounts')
  createAccount(@Request() req, @Param('id') id: string, @Body() createAccountDto: CreateAccountDto) {
    return this.customersService.createAccount(req.user, id, createAccountDto);
  }

  @Get(':id/accounts')
  findAccount(@Request() req, @Param('id') id: string, @Body() createAccountDto: CreateAccountDto) {
    return this.customersService.findAccount(req.user, id, createAccountDto);
  }

  @Post(':id/transactions')
  createTransactions(@Request() req, @Param('id') id: string, @Body() createTransactionDto: CreateTransactionDto) {
    return this.customersService.createTransactions(req.user, id, createTransactionDto);
  }

  @Get(':id/transactions')
  findTransactions(@Request() req, @Param('id') id: string) {
    return this.customersService.findAllTransactions(req.user, id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
  //   return this.customersService.update(+id, updateCustomerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customersService.remove(+id);
  // }
}
