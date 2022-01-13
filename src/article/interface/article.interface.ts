import { Tags } from '../../tag/entity/tag.entity';

export interface article {
  id: number;
  author: string;
  created_at: string;
  comment_text: string;
  title: string;
  tags: Array<Tags>;
}
