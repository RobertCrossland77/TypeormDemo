import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './modules/artist.entity';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';
import { SongService } from './song/song.service';
import { LyricService } from './lyric/lyric.service';
import { ArtistController } from './artist/artist.controller';
import { AlbumController } from './album/album.controller';
import { SongController } from './song/song.controller';
import { LyricController } from './lyric/lyric.controller';
import { Lyric } from './modules/lyric.entity';
import { Song } from './modules/song.entity';
import { Album } from './modules/album.entity';
import { SearchBuilderService } from './search-builder-service/search-builder-service.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Artist, Album, Song, Lyric])
  ],
  controllers: [
    ArtistController,
    AlbumController,
    SongController,
    LyricController
  ],
  providers: [
    ArtistService,
    AlbumService,
    SongService,
    LyricService,
    SearchBuilderService,
  ],
})
export class AppModule {}
