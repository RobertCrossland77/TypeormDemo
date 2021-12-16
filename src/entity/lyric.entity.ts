import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Song } from "./song.entity";

@Entity("lyrics")
export class Lyric  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    content: string;

    @OneToOne(_ => Song, song => song.lyrics)
    @JoinColumn({name: 'song_id'})
    song: Song; 
}

export type LyricUpdateDto = Omit<Partial<Lyric>, 'id'>;
export type LyricInsertDto = Pick<Lyric, 'content' | 'song'>;