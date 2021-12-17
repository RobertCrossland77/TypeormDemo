import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist, ArtistInsertDto, ArtistUpdateDto } from '../modules/artist.entity';
import { Equal, Like, Repository } from 'typeorm';
import { SearchBuilderService } from '../search-builder-service/search-builder-service.service';


@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    private readonly searchBuilderService: SearchBuilderService<Artist>,
  ) {}

  createArtist = (artist: ArtistInsertDto): Promise<ArtistInsertDto & Artist> => this.artistRepository.save(artist);

  artist = async(id: number): Promise<Artist> =>
    this.artistRepository.findOne({ where: { id: Equal(id) }});

  artists = async(ids?: Array<string>, skip?: number, take?: number, search?: string): Promise<Array<Artist>> => {
    const searchOptions = this.searchBuilderService.build({
        order: { id: 'ASC' },
        skip: skip,
        take: take,
        ids: ids,
        search: search ? { search_types: ['name'], search_string: search } : undefined
    }, 'id');

    return await this.artistRepository.find(searchOptions);
  }

  updateArtist = async(id: number, artist: ArtistUpdateDto) => {
    const currentArtist = this.artistRepository.findOne(id);
    return this.artistRepository.save({...currentArtist, ...artist});
  }
}