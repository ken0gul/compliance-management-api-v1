import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BaseRepository<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return await this.repository.save(newEntity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<T | null> {
    return await this.repository.findOne({ where: { id } as FindOptionsWhere<T> });
  }

  async update(id: string, entity: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id, entity as any);
    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByCondition(condition: FindOptionsWhere<T>): Promise<T[]> {
    return await this.repository.find({ where: condition });
  }
}
