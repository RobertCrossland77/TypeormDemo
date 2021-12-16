import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../modules/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  findAll(): Promise<Array<Artist>> {
    return this.artistRepository.find();
  }

  findOne(id: string): Promise<Artist> {
    return this.artistRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.artistRepository.delete(id);
  }
}