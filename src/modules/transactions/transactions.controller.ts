import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { TransactionsService } from './transactions.service';


@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@ActiveUserId() userId: string, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Get()
  findAllByUserId(@ActiveUserId() userId: string) {
    return this.transactionsService.findAllByUserId(userId);
  }


  @Put(':transactionId')
  update(@Param('transactionId') transactionId: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(transactionId, updateTransactionDto);
  }

  @Delete(':transactionId')
  remove(@Param('transactionId') transactionId: string) {
    return this.transactionsService.remove(transactionId);
  }
}
