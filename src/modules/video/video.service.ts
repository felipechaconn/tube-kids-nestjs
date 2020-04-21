import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoRepository } from './video.repository';
import { UserRepository } from '../user/user.repository';
import { ReadVideoDto, CreateVideoDto, UpdateVideoDto } from './dto';
import { plainToClass } from 'class-transformer';
import { Video } from './video.entity';
import { In } from 'typeorm';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoRepository)
    private readonly _videoRepository: VideoRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async get(videoId: number): Promise<ReadVideoDto> {
    if (!videoId) {
      throw new BadRequestException('You will send the id of video');
    }
    const video: Video = await this._videoRepository.findOne(videoId);
    if (!video) {
      throw new NotFoundException('Doesnt find these video');
    }
    return plainToClass(ReadVideoDto, video);
  }

  async getVideoByCreator(creatorId: number): Promise<ReadVideoDto[]> {
    if (!creatorId) {
      throw new BadRequestException('id must be sent');
    }
    const videos: Video[] = await this._videoRepository.find({
      where: { creator: In([creatorId]) },
    });

    return videos.map((video) => plainToClass(ReadVideoDto, video));
  }

  async create(video: Partial<CreateVideoDto>) {
    const creator = await this._userRepository.findOne(video.creator.id_user, {
      where: { status: 'ACTIVE' },
    });

    if (!creator) {
      throw new NotFoundException('User not found');
    }


    const savedVideo: Video = await this._videoRepository.save({
      name_video: video.name_video,
      description_video: video.description_video,
      link_video: video.link_video,
      creator,
    });
    console.log('these is creator ID', creator.id_user);
    return plainToClass(ReadVideoDto, savedVideo);
  }

  async update(
    videoId: number,
    updateDTO: Partial<UpdateVideoDto>,
  ): Promise<ReadVideoDto> {
    const videoExists = await this._videoRepository.findOne(videoId);
    if (!videoExists) {
      throw new NotFoundException('These video doesnt exists');
    }
    console.log('Este es el id del usuario',updateDTO.creator.id_user);
    const isOwnVideo = videoExists.creator.id_user ===  updateDTO.creator.id_user;
    if (!isOwnVideo) {
      throw new UnauthorizedException('This user isnt the video creator');
    }
   const updatedVideo = await this._videoRepository.update(videoId, updateDTO);
    return plainToClass(ReadVideoDto, updatedVideo);
  }

  async delete(videoId: number): Promise<void> {
    const videoExists = await this._videoRepository.findOne(videoId);
    if (!videoExists) {
      throw new NotFoundException('this video doesnt exists');
    }

    await this._videoRepository.delete(videoId);
  }
}
