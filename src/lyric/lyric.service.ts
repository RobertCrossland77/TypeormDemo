import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lyric, LyricInsertDto, LyricUpdateDto } from '../modules/lyric.entity';
import { SearchBuilderService } from '../search-builder-service/search-builder-service.service';
import { Equal, Repository } from 'typeorm';
import { Song } from '../modules/song.entity';

@Injectable()
export class LyricService {
constructor(
    @InjectRepository(Lyric) private readonly lyricRepository: Repository<Lyric>,
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
    private readonly searchBuilderService: SearchBuilderService<Lyric>,
  ) {}

  lyric = async(id: number): Promise<Lyric> =>
    this.lyricRepository.findOne({ where: { id: Equal(id) }});

  lyrics = async(skip?: number, take?: number, search?: string): Promise<Array<Lyric>> => {
    const searchOptions = this.searchBuilderService.build({
      order: { id: 'ASC' },
      skip: skip,
      take: take,
      search: search ? { search_types: ['name'], search_string: search } : undefined
    }, 'id');

    return await this.lyricRepository.find(searchOptions);
  }

  updateLyric = async(id: number, lyric: LyricUpdateDto) => 
    this.lyricRepository.update(id, lyric);

  deleteLyric = async(id: number) => this.lyricRepository.delete(id);
}
