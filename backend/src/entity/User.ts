// src/entity/User.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, Length } from "class-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 100 })
    companyName!: string;

    @Column({ length: 50 })
    industryType!: string;

    @Column({ length: 100, unique: true })
    companyRegNumber!: string;

    @Column({ length: 255 })
    address!: string;

    @Column({ length: 100 })
    contactName!: string;

    @Column({ length: 100 })
    contactPosition!: string;

    @IsEmail() // This ensures the email field is a valid email
    @Column({ length: 255, unique: true })
    email!: string;

    @Column({ length: 20 })
    phone!: string;

    @Length(6, 100) // This ensures the password is at least 6 characters long
    @Column()
    password!: string;
}
