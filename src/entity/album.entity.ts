import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Artist } from "./artist.entity";
import { Song } from "./song.entity";

@Entity("albums")
export class Album  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    title: string;

    @ManyToMany(_ => Artist, artist => artist.albums)
    artists: Array<Artist>;

    @OneToMany(_ => Song, song => song.albums, { eager: true, cascade: true })
    songs: Array<Song>
}

export type AlbumDto = Omit<Partial<Album>, 'id'>;
export type AlbumInsertDto = Pick<Album, 'title' | 'artists' | 'songs'>;