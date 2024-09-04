// src/entity/Emission.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IndustryUser } from "./IndustryUser";

@Entity()
export class Emission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  industryName!: string; // Consider removing this if it's duplicated information

  @Column("float")
  co2Emission!: number;

  @Column("date") // Use 'date' type for proper date handling
  date!: Date;

  @ManyToOne(() => IndustryUser, (industryUser) => industryUser.emissions)
  industryUser!: IndustryUser;
}