import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song, SongInsertDto, SongUpdateDto } from '../modules/song.entity';
import { SearchBuilderService } from '../search-builder-service/search-builder-service.service';
import { Equal, Repository } from 'typeorm';
import { Album } from '../modules/album.entity';

@Injectable()
export class SongService {
constructor(
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
    @InjectRepository(Album) private readonly albumRepository: Repository<Album>,
    private readonly searchBuilderService: SearchBuilderService<Song>,
  ) {}

  createSong = async(album_id: number, song: SongInsertDto): Promise<SongInsertDto & Song> => {
    const linkedAlbum = await this.albumRepository.findOneOrFail(album_id);
    song.albums = [...song.albums, linkedAlbum];
    
    return this.songRepository.save(song);
  }

  song = async(id: number): Promise<Song> =>
    this.songRepository.findOne({ where: { id: Equal(id) }});

  songs = async(ids?: Array<string>, skip?: number, take?: number, search?: string): Promise<Array<Song>> => {
    const searchOptions = this.searchBuilderService.build({
      order: { id: 'ASC' },
      skip: skip,
      take: take,
      ids: ids,
      search: search ? { search_types: ['name'], search_string: search } : undefined
    }, 'id');

    return await this.songRepository.find(searchOptions);
  }

  updateSong = async(id: number, song: SongUpdateDto) => 
    this.songRepository.update(id, song);

  deleteSong = async(id: number) => this.songRepository.delete(id);
}
