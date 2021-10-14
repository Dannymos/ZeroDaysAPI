import {
  Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ length: 50 })
    title: string;

  @Column({ length: 300, nullable: true })
    description: string;

  @Column()
    completed: boolean;

  @Column({ nullable: true })
    duedate: Date;
}
