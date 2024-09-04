// src/entity/User.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseUser } from "./BaseUser";

@Entity()
export class NGOUser extends BaseUser{

    @Column({ length: 100 })
    organizationName!: string;

    @Column({ length: 50 })
    ngoRegNumber!: string;

    @Column({ length: 50 })
    address!: string;

    @Column({ length: 100, unique: true })
    projectName!: string;

    @Column({ length: 255 })
    projectDescription!: string;

    @Column({ length: 100 })
    contactName!: string;

    @Column({ length: 100 })
    contactPosition!: string;

}
