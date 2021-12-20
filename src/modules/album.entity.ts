import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Artist } from "./artist.entity";
import { Song } from "./song.entity";

@Entity("albums")
export class Album  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  title: string;

  @Column({type: 'timestamptz', nullable: true})
  release_date: Date;

  @ManyToMany(_ => Artist, artist => artist.albums)
  @JoinTable({
    name: 'artist_albums',
    joinColumn: {
      name: "album_id", referencedColumnName: "id"
    }, 
    inverseJoinColumn: {
      name: "artist_id", referencedColumnName: "id"
    }
  })
  artists: Array<Artist>;

  @OneToMany(_ => Song, song => song.albums, { eager: true, cascade: true})
  songs: Array<Song>
}

export type AlbumUpdateDto = Omit<Partial<Album>, 'id'>;
export type AlbumInsertDto = Pick<Album, 'title' | 'artists' | 'songs'>;