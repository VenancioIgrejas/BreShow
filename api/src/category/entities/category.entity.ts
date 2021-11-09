import { BaseEntity } from '../../base/base.entity';
import { Entity, Column} from 'typeorm';

@Entity({ name: 'category' })
export class Category extends BaseEntity {

    @Column({ type: 'varchar', length: 100 })
    idUser: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    constructor(partial: Partial<Category>) {
        super(partial);
        Object.assign(this, partial);
        this.createdBy = 'someone';
        this.lastChangedBy = 'someone';
      }
}
