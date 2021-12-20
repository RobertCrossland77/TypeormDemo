import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Lyric, LyricInsertDto, LyricUpdateDto } from '../modules/lyric.entity';
import { LyricService } from './lyric.service';

@Controller('lyric')
export class LyricController {
  constructor(private readonly songService: LyricService) {}

  @Post(':song_id')
  async CreateLyric(
    @Param('song_id') song_id: number,
    @Body() lyric: LyricInsertDto
  ): Promise<LyricInsertDto & Lyric> {
    return this.songService.createLyric(song_id, lyric);
  }

  @Get(':id')
  async GetById(@Param('id') id: number): Promise<Lyric> {
    return this.songService.lyric(id);
  }

  @Get()
  read(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('search') search?: string,
  ) {
    return this.songService.lyrics(skip, take, search);
  }

  @Put(':id')
  async Update(@Param('id') id: number, @Body() lyric: LyricUpdateDto) {
    return this.songService.updateLyric(id, lyric);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number) {
    return this.songService.deleteLyric(id);
  } 
}
