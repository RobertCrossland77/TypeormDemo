import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entity/artist.entity';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';
import { SongService } from './song/song.service';
import { LyricService } from './lyric/lyric.service';
import { ArtistController } from './artist/artist.controller';
import { AlbumController } from './album/album.controller';
import { SongController } from './song/song.controller';
import { LyricController } from './lyric/lyric.controller';
import { Lyric } from './entity/lyric.entity';
import { Song } from './entity/song.entity';
import { Album } from './entity/album.entity';

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
  ],
})
export class AppModule {}
