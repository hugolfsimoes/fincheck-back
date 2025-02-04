import { Injectable } from '@nestjs/common';

import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';


import { ValidadeBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ValidadeCategoryOwnershipService } from '../categories/services/validate-category-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepo: TransactionsRepository, private readonly validadeBankAccountOwnershipService: ValidadeBankAccountOwnershipService, private readonly validadeCategoryOwnershipService: ValidadeCategoryOwnershipService) {}
  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } = createTransactionDto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });


    return this.transactionsRepo.create({ data: { userId, bankAccountId, categoryId, date, name, type, value } });
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepo.findMany({
      where: {
        userId,
      },
    });
  }

  update(transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${transactionId} transaction`;
  }

  remove(transactionId: string) {
    return `This action removes a #${transactionId} transaction`;
  }

  private async validateEntitiesOwnership({ userId, bankAccountId, categoryId }:
    { userId: string, bankAccountId: string, categoryId: string; }) {
    await Promise.all([
      this.validadeBankAccountOwnershipService.validate(userId, bankAccountId),
      this.validadeCategoryOwnershipService.validate(userId, categoryId)
    ]);

  }
}
