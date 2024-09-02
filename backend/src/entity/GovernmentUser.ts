// src/entity/User.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseUser } from "./BaseUser";

@Entity()
export class GovernmentUser extends BaseUser{

    @Column({ length: 100 })
    departmentName!: string;

    @Column({ length: 50 })
    governmentId!: string;

    @Column({ length: 100, unique: true })
    address!: string;

    @Column({ length: 255 })
    officialEmail!: string;

}
