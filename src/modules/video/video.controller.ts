import { Controller, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { VideoService } from './video.service';
import { ReadVideoDto, CreateVideoDto } from './dto';
import { GetUser } from '../auth/user.decorator';


@Controller('video')
export class VideoController {
 constructor(private readonly _videoService: VideoService){}

 @Get(':id')
 getVideo(@Param('di',ParseIntPipe)id: number):Promise<ReadVideoDto> {
     return this._videoService.get(id);
 }

 @Get('myvideo/:ownerId') 
     getVideoByOwner(
         @Param('ownerId', ParseIntPipe)ownerId: number,
         ): Promise<ReadVideoDto[]> {
         return this._videoService.getVideoByCreator(ownerId);
     }

@Post()
     createVideo(
         @Body() role: Partial<CreateVideoDto>,
         @GetUser('id') creatorId: number,
     ): Promise<ReadVideoDto> {
         return this._videoService.create(role, creatorId);
     }

 
}
