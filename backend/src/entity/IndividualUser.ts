// src/entity/User.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseUser } from "./BaseUser";

@Entity()
export class IndividualUser extends BaseUser{

    @Column({ length: 100 })
    fullName!: string;

    @Column({ length: 50 })
    dateOfBirth!: string;

    @Column({ length: 100, unique: true })
    address!: string;

    @Column({ length: 255 })
    carbonFootprint!: string;

    @Column({ nullable: true })
    referralCode?: string;

}
