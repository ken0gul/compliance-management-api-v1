import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

export enum UserRole {
  ADMIN = 'admin',
  STANDARD = 'standard',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  @Index()
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STANDARD,
  })
  role: UserRole;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
