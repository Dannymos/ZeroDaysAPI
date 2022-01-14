import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ length: 50 })
    title: string;

  @Column({ length: 300, nullable: true })
    description?: string | null;

  @Column()
    completed: boolean;

  @Column({ nullable: true })
    duedate?: Date | null;

  @ManyToOne(() => Task, (task) => task.children)
    parent?: Task | null;

  @OneToMany(() => Task, (task) => task.parent)
    children?: Task[] | null;
}
