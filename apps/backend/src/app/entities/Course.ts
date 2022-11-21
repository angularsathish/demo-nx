import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Not,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UniqueOnDatabase } from '../utils/UniqueValidation';
import { Request } from 'express';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'The courseName is required' })
  @UniqueOnDatabase(Course, (req: Request) =>
    req.params.id ? { id: Not(req.params.id) } : null
  )
  courseName: string;

  @Column()
  @IsNotEmpty({ message: 'The courseCode is required' })
  @UniqueOnDatabase(Course, (req: Request) =>
    req.params.id ? { id: Not(req.params.id) } : null
  )
  courseCode: string;

  @Column()
  courseDetail: string;

  @Column({ nullable: true, default: 0 })
  coursePrice: number;

  @Column()
  startDate: Date;

  @Column()
  professorDetail: string;

  @Column()
  timeLength: string;

  @Column()
  maxStudent: number;

  @Column()
  contact: string;

  @Column({ type: 'int' })
  isDeleted: number;

  @Column()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
