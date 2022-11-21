import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Not,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Actions } from '../interfaces/enum/actions';
import { Role } from '../interfaces/enum/role';
import { UniqueOnDatabase } from '../utils/UniqueValidation';
import { Request } from 'express';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'The FirstName is required' })
  firstName: string;

  @Column()
  @IsNotEmpty({ message: 'The LastName is required' })
  lastName: string;

  @Column()
  @IsNotEmpty({ message: 'The UserName is required' })
  @UniqueOnDatabase(User, (req: Request) =>
    req.params.id ? { id: Not(req.params.id) } : null
  )
  userName: string;

  @Column({ type: 'enum', enum: Role })
  @IsNotEmpty({ message: 'The Role is required' })
  role: string;

  @Column('simple-array')
  @IsNotEmpty({ message: 'The Permission is required' })
  permissions: Array<Actions>;

  @Column()
  @IsNotEmpty({ message: 'The Password is required' })
  password: string;

  @Column({ type: 'int' })
  isDeleted: number;

  @Column()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
