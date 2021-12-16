import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Album } from "./album.entity";

@Entity("artists")
export class Artist  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    name: string;

    @ManyToMany(_ => Album, album => album.artists, { eager: true, cascade: true })
    @JoinTable({
        name: 'artist_albums',
        joinColumn: {
            name: "artist_id", referencedColumnName: "id"
        }, 
        inverseJoinColumn: {
            name: "album_id", referencedColumnName: "id"
        }
    })
    albums: Array<Album>;
}

export type ArtistUpdateDto = Omit<Partial<Artist>, 'id'>;
export type ArtistInsertDto = Pick<Artist, 'name' | 'albums'>;