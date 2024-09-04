import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class KYCSubmission {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @Column()
    role!: string;

    @Column()
    documentHash!: string;

    @Column({ nullable: true })
    businessAddress?: string;

    @Column({ nullable: true })
    businessLicense?: string;

    @Column({ nullable: true })
    startDate?: string;

    @Column({ nullable: true })
    taxId?: string;

    @Column({ nullable: true })
    registrationDate?: string;

    @Column({ nullable: true })
    ngoCertificate?: string;

    @Column({ nullable: true })
    areaOfOperation?: string;

    @Column({ nullable: true })
    passportOrId?: string;

    @Column({ nullable: true })
    proofOfAddress?: string;

    @Column({ nullable: true })
    nationality?: string;

    @Column({ nullable: true })
    gender?: string;

    @Column({ default: false })
    approved!: boolean;
}
