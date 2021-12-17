import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Artist, ArtistInsertDto, ArtistUpdateDto } from 'src/modules/artist.entity';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    @Post()
    async CreateArtist(
      @Body() artist: ArtistInsertDto
    ): Promise<ArtistInsertDto & Artist> {
      return this.artistService.createArtist(artist);
    }
  
    @Get(':id')
    async GetById(@Param('id') id: number): Promise<Artist> {
      return this.artistService.artist(id);
    }


    @Get()
    read(
        @Query('ids') ids?: Array<string>,
        @Query('skip') skip?: number,
        @Query('take') take?: number,
        @Query('search') search?: string,
    ) {
      return this.artistService.artists(ids, skip, take, search);
    }

    @Put(':id')
    async Update(@Param('id') id: number, @Body() artist: ArtistUpdateDto): Promise<Artist> {
      return this.artistService.updateArtist(id, artist);
    }
  
    /*
    @Delete(':id')
    async Delete(@Param('id') id: string): Promise<ArtistModel> {
      return this.artistService.deleteArtist({ id: Number(id)});
    } */
}
