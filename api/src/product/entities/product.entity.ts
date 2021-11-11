import { BaseEntity } from '../../base/base.entity';
import { Entity, Column, OneToOne, JoinColumn, JoinColumnOptions} from 'typeorm';
import { Provider } from 'src/provider/entities/provider.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity{
    @Column({ type: 'varchar', length: 100 })
    idUser: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @OneToOne(() => Provider)
    @JoinColumn(<JoinColumnOptions>{name: 'categoryId'})
    category: Provider;

    @OneToOne(() => Provider)
    @JoinColumn(<JoinColumnOptions>{name: 'providerId'})
    provider: Provider;
    
    @Column({ type: 'int'})
    price: number;

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
