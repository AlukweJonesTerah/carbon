// src/entity/IndustryUser.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BaseUser } from "./BaseUser";
import { Emission } from "./Emission";

@Entity()
export class IndustryUser extends BaseUser {
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

  @OneToMany(() => Emission, (emission) => emission.industryUser)
  emissions!: Emission[];
}