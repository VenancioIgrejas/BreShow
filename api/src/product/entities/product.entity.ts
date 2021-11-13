import { BaseEntity } from '../../base/base.entity';
import { Entity, Column, OneToOne, JoinColumn, JoinColumnOptions, OneToMany, ManyToOne} from 'typeorm';
import { Provider } from 'src/provider/entities/provider.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity{
    @Column({ type: 'varchar', length: 100 })
    idUser: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @ManyToOne(() => Category)
    @JoinColumn(<JoinColumnOptions>{name: 'categoryId'})
    category: Category;

    @ManyToOne(() => Provider)
    @JoinColumn(<JoinColumnOptions>{name: 'providerId'})
    provider: Provider;
    
    @Column({ type: "decimal"})
    price: number;
    
    @Column({ type: "decimal"})
    priceFinal: number;

    @Column({ type: "decimal"})
    priceTotal: number;

    @Column({ type: 'int' })
    quantity: number;
    
    @Column({ type: 'varchar', length: 100 })
    comment: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    dateIn: Date;

    constructor(partial: Partial<Product>) {
        super(partial);
        Object.assign(this, partial);
        this.createdBy = 'someone';
        this.lastChangedBy = 'someone';
      }
}
