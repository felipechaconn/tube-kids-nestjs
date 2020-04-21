import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { ReadVideoDto, CreateVideoDto,UpdateVideoDto } from './dto';
import { GetUser } from '../auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('video')
export class VideoController {
  constructor(private readonly _videoService: VideoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':idVideo')
  getVideo(@Param('idVideo', ParseIntPipe) id: number): Promise<ReadVideoDto> {
    return this._videoService.get(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('myvideo/:ownerId')
  getVideoByOwner(
    @Param('ownerId', ParseIntPipe) ownerId: number,
  ): Promise<ReadVideoDto[]> {
    return this._videoService.getVideoByCreator(ownerId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createVideo(
    @Body() video: Partial<CreateVideoDto>
  ): Promise<ReadVideoDto> {
    console.log('MyVideo', video);
    return this._videoService.create(video);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteVideo(@Param('id', ParseIntPipe) id: number) {
    await this._videoService.delete(id);
    return true;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':videoId')
  async updateUser(
    @Param('videoId',ParseIntPipe) videoId: number,
    @Body() videoUpdate: UpdateVideoDto,
  ) {
   return this._videoService.update(videoId,videoUpdate);
  }
}
