import { Repository, EntityRepository, Entity } from 'typeorm';
import { Video } from './video.entity';

@EntityRepository(Video)
export class VideoRepository extends Repository<Video> {}
