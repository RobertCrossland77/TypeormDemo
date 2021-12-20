import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Album } from "./album.entity";
import { Lyric } from "./lyric.entity";

@Entity("songs")
export class Song  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  name: string;

  @ManyToOne(_ => Album, album => album.songs)
  @JoinColumn({name: 'album_id'})
  albums: Array<Album>;

  @OneToOne(_ => Lyric, lyric => lyric.song, { eager: true, cascade: true })
  lyrics: Lyric;
}

export type SongUpdateDto = Omit<Partial<Song>, 'id'>;
export type SongInsertDto = Pick<Song, 'name' | 'albums'>;