import { Repository, EntityRepository } from 'typeorm';
import { Cost } from './cost.entity';

@EntityRepository(Cost)
export class CostRepository extends Repository<Cost> {}
