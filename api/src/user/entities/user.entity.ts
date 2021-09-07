// user.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity{

    @Column({ type: 'varchar', length: 300 })
    name: string;
    
    @Column({ type: 'varchar', length: 300 })
    username: string;

    @Column({ type: 'varchar', length: 300 })
    password: string;

    @Column({ type: 'varchar', length: 300 })
    description: string;
}
