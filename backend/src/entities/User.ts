import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Link } from "./Link";

export enum Role {
    Admin = "admin",
    User = "user"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.User
    })
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Link, link => link.user)
    links: Link[];
}