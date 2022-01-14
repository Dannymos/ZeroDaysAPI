import {
  Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Project {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ length: 50 })
    title: string;

  @Column({ length: 300, nullable: true })
    description?: string | null;
}
