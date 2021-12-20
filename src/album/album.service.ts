import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album, AlbumInsertDto, AlbumUpdateDto } from '../modules/album.entity';
import { SearchBuilderService } from '../search-builder-service/search-builder-service.service';
import { Equal, Repository } from 'typeorm';
import { Artist } from '../modules/artist.entity';

@Injectable()
export class AlbumService {
constructor(
    @InjectRepository(Album) private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist) private readonly artistRepository: Repository<Artist>,
    private readonly searchBuilderService: SearchBuilderService<Album>,
  ) {}

  createAlbum = async(artist_id: number, album: AlbumInsertDto): Promise<AlbumInsertDto & Album> => {
    const linkedArtist = await this.artistRepository.findOneOrFail(artist_id);
    album.artists = [...album.artists, linkedArtist];
    
    return this.albumRepository.save(album);
  }

  album = async(id: number): Promise<Album> =>
    this.albumRepository.findOne({ where: { id: Equal(id) }});

  albums = async(ids?: Array<string>, skip?: number, take?: number, search?: string): Promise<Array<Album>> => {
    const searchOptions = this.searchBuilderService.build({
      order: { id: 'ASC' },
      skip: skip,
      take: take,
      ids: ids,
      search: search ? { search_types: ['title'], search_string: search } : undefined
    }, 'id');

    return await this.albumRepository.find(searchOptions);
  }

  updateAlbum = async(id: number, artist: AlbumUpdateDto) => 
    this.albumRepository.update(id, artist);

  deleteAlbum = async(id: number) => this.albumRepository.delete(id);
}
