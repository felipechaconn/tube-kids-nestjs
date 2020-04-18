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
import { Role } from '../role/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('video')
export class VideoController {
  constructor(private readonly _videoService: VideoService) {}

  @Get(':idVideo')
  getVideo(@Param('idVideo', ParseIntPipe) id: number): Promise<ReadVideoDto> {
    return this._videoService.get(id);
  }

  @Get('myvideo/:ownerId')
  getVideoByOwner(
    @Param('ownerId', ParseIntPipe) ownerId: number,
  ): Promise<ReadVideoDto[]> {
    console.log(ownerId);
    return this._videoService.getVideoByCreator(ownerId);
  }

  @Post()
  createVideo(
    @Body() video: Partial<CreateVideoDto>
  ): Promise<ReadVideoDto> {
    console.log('MyVideo', video);
    return this._videoService.create(video);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this._videoService.delete(id);
    return true;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':videoId')
  async updateUser(
    @Param('videoId',ParseIntPipe) videoId: number,
    @Body() videoUpdate: UpdateVideoDto,
  ) {
    console.log('Este es el body',videoUpdate);
   return this._videoService.update(videoId,videoUpdate);
  }
}
