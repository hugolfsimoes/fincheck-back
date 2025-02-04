import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './services/categories.service';
import { ValidadeCategoryOwnershipService } from './services/validate-category-ownership.service';

@Module({
  controllers: [ CategoriesController ],
  providers: [ CategoriesService, ValidadeCategoryOwnershipService ],
  exports: [ ValidadeCategoryOwnershipService ]
})
export class CategoriesModule {}
