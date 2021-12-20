import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Album, AlbumInsertDto, AlbumUpdateDto } from '../modules/album.entity';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post(':artist_id')
  async CreateArtist(
    @Param('artist_id') artist_id: number,
    @Body() album: AlbumInsertDto
  ): Promise<AlbumInsertDto & Album> {
    return this.albumService.createAlbum(artist_id, album);
  }

  @Get(':id')
  async GetById(@Param('id') id: number): Promise<Album> {
    return this.albumService.album(id);
  }

  @Get()
  read(
    @Query('ids') ids?: Array<string>,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('search') search?: string,
  ) {
    return this.albumService.albums(ids, skip, take, search);
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
