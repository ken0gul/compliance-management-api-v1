import { User, UserRole } from '../entities/user.entity';

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  createUser(userData: {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  }): Promise<User>;
  userExists(username: string): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
}
