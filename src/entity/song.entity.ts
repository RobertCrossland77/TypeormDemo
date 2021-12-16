import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Album } from "./album.entity";
import { Lyric } from "./lyric.entity";

@Entity("songs")
export class Song  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    name: string;

    @OneToMany(_ => Album, album => album.songs)
    albums: Array<Album>;

    @OneToOne(_ => Lyric, lyric => lyric.song, { eager: true, cascade: true })
    lyrics: Lyric;
}

export type SongUpdateDto = Omit<Partial<Song>, 'id'>;
export type SongInsertDto = Pick<Song, 'name' | 'albums'>;