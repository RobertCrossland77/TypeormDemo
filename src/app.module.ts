import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './type-orm-config.service';
import { Artist } from './entity/artist.entity';
import { ArtistService } from './artist/artist.service';
import { AlbumService } from './album/album.service';
import { SongService } from './song/song.service';
import { LyricService } from './lyric/lyric.service';
import { ArtistController } from './artist/artist.controller';
import { AlbumController } from './album/album.controller';
import { SongController } from './song/song.controller';
import { LyricController } from './lyric/lyric.controller';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
  ],
  controllers: [
    ArtistController,
    AlbumController,
    SongController,
    LyricController
  ],
  providers: [
    TypeOrmConfigService,
    ArtistService,
    AlbumService,
    SongService,
    LyricService,
    ConfigService
  ],
})
export class AppModule {}
