import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album, AlbumUpdateDto } from '../modules/album.entity';
import { SearchBuilderService } from '../search-builder-service/search-builder-service.service';
import { Equal, Repository } from 'typeorm';
import { Song, SongInsertDto } from '../modules/song.entity';

@Injectable()
export class AlbumService {
constructor(
    @InjectRepository(Album) private readonly albumRepository: Repository<Album>,
    private readonly searchBuilderService: SearchBuilderService<Album>,
  ) {}

  addSong = async(album_id: number, song: SongInsertDto) => {
    const album = await this.albumRepository.findOneOrFail(album_id);
    album.songs = [...album.songs, song as Song];
    return this.albumRepository.save(album);
  }

  album = async(id: number): Promise<Album> =>
    this.albumRepository.findOne({ where: { id: Equal(id) }});

  albums = async(skip?: number, take?: number, search?: string): Promise<Array<Album>> => {
    const searchOptions = this.searchBuilderService.build({
      order: { id: 'ASC' },
      skip: skip,
      take: take,
      search: search ? { search_types: ['title'], search_string: search } : undefined
    }, 'id');

    return await this.albumRepository.find(searchOptions);
  }

  updateAlbum = async(id: number, artist: AlbumUpdateDto) => 
    this.albumRepository.update(id, artist);

  deleteAlbum = async(id: number) => this.albumRepository.delete(id);
}
