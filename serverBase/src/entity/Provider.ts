import {Entity, PrimaryGeneratedColumn, Column, Double, ManyToOne, JoinColumn} from "typeorm";

@Entity()
export class Provider {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    UserId: string;

    @Column()
    name: string;

    @Column()
    cel: string;

    @Column()
    info: string;

    @Column({ type: "decimal"})
    per_price: Double;

}
