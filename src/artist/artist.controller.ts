import { Body, Controller, Post } from '@nestjs/common';
import { Artist, ArtistInsertDto } from 'src/modules/artist.entity';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    @Post()
    async CreateArtist(
      @Body() artist: ArtistInsertDto
    ): Promise<Artist> {
        console.log(`artist: ${JSON.stringify(artist)}`)
      return this.artistService.createArtist(artist);
    }
  /*
    @Get()
    async GetAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('name') nameSearch?: string): Promise<Array<ArtistModel>> {
      return this.artistService.artists({
        skip: skip && skip.length > 0 ? Number(skip) : undefined,
        take: take && take.length > 0 ? Number(take) : undefined,
        where: {
          name: { contains: nameSearch }
        }
      });
    }
  
    @Get(':id')
    async GetById(@Param('id') id: string): Promise<ArtistModel> {
      return this.artistService.artist({ id: Number(id) });
    }
  
    @Put(':id')
    async Update(@Param('id') id: string, @Body() artist: Omit<Partial<ArtistModel>, 'id'>): Promise<ArtistModel> {
      console.log(`artist: ${artist}`)
      return this.artistService.updateArtist({
        where: { id: Number(id) },
        data: artist
      });
    }
  
    @Delete(':id')
    async Delete(@Param('id') id: string): Promise<ArtistModel> {
      return this.artistService.deleteArtist({ id: Number(id)});
    } */
}
