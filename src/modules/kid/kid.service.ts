import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { KidRepository } from './kid.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { ReadKidDto } from './dto/read-kid.dto';
import { Kid } from './kid.entity';
import { plainToClass } from 'class-transformer';
import { In } from 'typeorm';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';
import { ReadUserDto, ReadUserByKidDto } from '../user/dto';

@Injectable()
export class KidService {

    constructor(
    @InjectRepository(KidRepository)
    private readonly _kidRepository: KidRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,){}

    async getKid(id_kid: number): Promise<ReadKidDto> {
        if (!id_kid) {
          throw new BadRequestException('You will send the id of video');
        }
        const kid: Kid = await this._kidRepository.findOne(id_kid);
        if (!kid) {
          throw new NotFoundException('Doesnt find these video');
        }
        return plainToClass(ReadKidDto, kid);
      }

      async getParentbyKid(id_kid: number): Promise<ReadUserByKidDto> {
        if (!id_kid) {
          throw new BadRequestException('id must be sent');
        }
        const kid: Kid = await this._kidRepository.findOne(id_kid);
        if(!kid){
          throw new NotFoundException('Id doesnt exists');
        }
        const creator = kid.creator;
        return plainToClass(ReadUserByKidDto, creator);
      }
      async getKidbyParent(creatorId: number): Promise<ReadKidDto[]> {
        if (!creatorId) {
          throw new BadRequestException('id must be sent');
        }
        const kids: Kid[] = await this._kidRepository.find({
          where: { creator: In([creatorId]) },
        });
    
        return kids.map((kid) => plainToClass(ReadKidDto, kid));
      }

      async create(kid: Partial<CreateKidDto>) {
        const creator = await this._userRepository.findOne(kid.creator.id_user, {
          where: { status: 'ACTIVE' },
        });
    
        if (!creator) {
          throw new NotFoundException('Parent Not Found');
      }
    
    
        const savedKid: Kid = await this._kidRepository.save({
          firstName_kid: kid.firstName_kid,
          username_kid: kid.username_kid,
          pin_kid: kid.pin_kid,
          birthday_kid : kid.birthday_kid,
          creator,
        });
        console.log('these is parent ID', creator.id_user);
        return plainToClass(ReadKidDto, savedKid);
      }

      async update(
        kidId: number,
        updateDTO: Partial<UpdateKidDto>,
      ): Promise<ReadKidDto> {
        const kidExists = await this._kidRepository.findOne(kidId);
        if (!kidExists) {
          throw new NotFoundException('These kid doesnt exists');
        }
        console.log('Este es el id del parent',updateDTO.creator.id_user);
        const isOwnVideo = kidExists.creator.id_user ===  updateDTO.creator.id_user;
        if (!isOwnVideo) {
          throw new UnauthorizedException('This user isnt the Parent kid');
        }
       const updatedKid = await this._kidRepository.update(kidId, updateDTO);
        return plainToClass(ReadKidDto, updatedKid);
      }

      async delete(kidId: number): Promise<void> {
        const videoExists = await this._kidRepository.findOne(kidId);
        if (!videoExists) {
          throw new NotFoundException('this Kid doesnt exists');
        }
    
        await this._kidRepository.delete(kidId);
      }
}
