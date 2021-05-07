import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Link {
    @PrimaryGeneratedColumn()
    id: number;

    @Index("basePath-idx")
    @Column({unique: true})
    basePath: string;

    @Column()
    redirectTo: string;

    @ManyToOne(() => User, user => user.links)
    user: User;
}