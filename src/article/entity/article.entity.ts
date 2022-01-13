import { Tags } from '../../tag/entity/tag.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  author: string;

  @Column({ type: 'timestamptz' })
  created_at: string;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar' })
  comment: string;

  @ManyToMany(() => Tags, (tags: Tags) => tags.articles, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'article_tag',
    joinColumn: { name: 'article_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tags[];
}
