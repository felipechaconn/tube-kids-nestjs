import { Repository, EntityRepository, Entity } from 'typeorm';
import { Kid } from './kid.entity';

@EntityRepository(Kid)
export class KidRepository extends Repository<Kid> {}
