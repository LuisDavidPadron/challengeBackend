import { EntityRepository, Repository } from 'typeorm';
import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Tags } from '../entity/tag.entity';
import { TagDto } from '../dto/tag.dto';
import { HandlingErrors } from '../../errors/error';

@EntityRepository(Tags)
export class TagRepository extends Repository<Tags> {
  async createTag(tagDto: TagDto): Promise<Tags> {
    const { name } = tagDto;

    const tag = new Tags();

    tag.name = name;

    try {
      await tag.save();
      return tag;
    } catch (error) {
      if (error.code === '23505') {
        throw new HandlingErrors('Tag Existente', HttpStatus.NOT_FOUND);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
