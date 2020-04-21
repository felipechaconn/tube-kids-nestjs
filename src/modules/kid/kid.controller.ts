import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { KidService } from './kid.service';
import { ReadKidDto } from './dto/read-kid.dto';
import { CreateKidDto } from './dto/create-kid.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateKidDto } from './dto/update-kid.dto';

@Controller('kid')
export class KidController {
  constructor(private readonly _kidService: KidService) {}

  @Get(':idKid')
  getKid(@Param('idKid', ParseIntPipe) idKid: number): Promise<ReadKidDto> {
    return this._kidService.getKid(idKid);
  }

  @Get('parent/:parentId')
  getKidByParent(
    @Param('parentId', ParseIntPipe) parentId: number,
  ): Promise<ReadKidDto[]> {
    console.log(parentId);
    return this._kidService.getKidbyParent(parentId);
  }

  @Post()
  createKid(@Body() kid: Partial<CreateKidDto>): Promise<ReadKidDto> {
    console.log('MyKid', kid);
    return this._kidService.create(kid);
  }

  @Delete(':idKid')
  async deleteKid(@Param('idKid', ParseIntPipe) idKid: number) {
    await this._kidService.delete(idKid);
    return true;
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Put(':kidId')
  async updateUser(
    @Param('kidId',ParseIntPipe) kidId: number,
    @Body() kidUpdate: UpdateKidDto,
  ) {
   return this._kidService.update(kidId,kidUpdate);
  }
}
