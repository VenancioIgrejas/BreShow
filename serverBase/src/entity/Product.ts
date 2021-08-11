import {Entity, PrimaryGeneratedColumn, Column, Double, ManyToOne, JoinColumn} from "typeorm";
import {Category} from "./Category";
import {Provider} from "./Provider";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    UserId: string;

    @Column()
    name: string;

    @ManyToOne(type => Category)
    @JoinColumn()
    Category: Category;

    @Column()
    comment: string;

    @ManyToOne(type => Provider)
    @JoinColumn()
    Provider: Provider;

    @Column({ type: "decimal"})
    price: Double;
    
    @Column()
    quantity: number;

    @Column()
    date_in: Date;
}
