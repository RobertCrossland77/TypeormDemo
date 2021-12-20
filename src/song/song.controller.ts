import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Song, SongInsertDto, SongUpdateDto } from '../modules/song.entity';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post(':album_id')
  async CreateSong(
    @Param('album_id') album_id: number,
    @Body() song: SongInsertDto
  ): Promise<SongInsertDto & Song> {
    return this.songService.createSong(album_id, song);
  }

  @Get(':id')
  async GetById(@Param('id') id: number): Promise<Song> {
    return this.songService.song(id);
  }

  @Get()
  read(
    @Query('ids') ids?: Array<string>,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('search') search?: string,
  ) {
    return this.songService.songs(ids, skip, take, search);
  }

  @Put(':id')
  async Update(@Param('id') id: number, @Body() song: SongUpdateDto) {
    return this.songService.updateSong(id, song);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number) {
    return this.songService.deleteSong(id);
  } 
}
