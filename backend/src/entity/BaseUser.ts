// src/entity/BaseUser.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, Length } from "class-validator";

@Entity()
export class BaseUser {

    @PrimaryGeneratedColumn()
    id!: number;

    @IsEmail() // This ensures the email field is a valid email
    @Column({ length: 255, unique: true })
    email!: string;

    @Column({ length: 20 })
    phone!: string;

    @Column({ length: 20 })
    username!: string;

    @Length(6, 100) // password is at least 6 characters long
    @Column()
    password!: string;

    @Column({nullable: false})
    role!: string;
}
