import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './repository/tag.repository';
import { TagService } from './tag.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([TagRepository])],
  providers: [TagService],
  controllers: [],
  exports: [TagService],
})
export class TagModule {}
