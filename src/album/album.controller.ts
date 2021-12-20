import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SongInsertDto } from '../modules/song.entity';
import { Album, AlbumUpdateDto } from '../modules/album.entity';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post(':album_id/song')
  async AddSong(
    @Param('album_id') album_id: number,
    @Body() song: SongInsertDto
  ) {
    return this.albumService.addSong(album_id, song);
  }

  @Get(':id')
  async GetById(@Param('id') id: number): Promise<Album> {
    return this.albumService.album(id);
  }

  @Get()
  read(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('search') search?: string,
  ) {
    return this.albumService.albums(skip, take, search);
  }

  @Put(':id')
  async Update(@Param('id') id: number, @Body() album: AlbumUpdateDto) {
    return this.albumService.updateAlbum(id, album);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number) {
    return this.albumService.deleteAlbum(id);
  } 
}
