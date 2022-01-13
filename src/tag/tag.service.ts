import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandlingErrors } from '../errors/error';
import { TagDto } from './dto/tag.dto';
import { Tags } from './entity/tag.entity';
import { TagRepository } from './repository/tag.repository';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagRepository)
    private tagRepository: TagRepository,
  ) {}

  async createTag(tagDto: TagDto): Promise<Tags> {
    const resp = await this.tagRepository.createTag(tagDto);

    if (!resp)
      throw new HandlingErrors('Impossible create tag', HttpStatus.NOT_FOUND);

    return resp;
  }

  async getTagExist(tagDto: TagDto): Promise<Tags> {
    const { name } = tagDto;
    const tag = await this.tagRepository.findOne({ name });

    if (tag) {
      return tag;
    } else {
      return null;
    }
  }
}
