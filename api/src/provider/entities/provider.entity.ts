// user.entity.ts
import { Entity, Column} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'provider' })
export class Provider extends BaseEntity{
    
    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'int'})
    perPrice: number;

    @Column({ type: 'varchar', length: 30 })
    cel: string;

    @Column({ type: 'varchar', length: 100 })
    info: string;

    constructor(partial: Partial<Provider>) {
        super(partial);
        Object.assign(this, partial);
        this.createdBy = 'someone';
        this.lastChangedBy = 'someone';
      }
}
