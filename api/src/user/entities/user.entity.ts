// user.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
export class User extends BaseEntity{
    
    @Column({ type: 'varchar', length: 300 })
    username: string;

    @Column({ type: 'varchar', length: 300 })
    password: string;

    @Column({ type: 'varchar', length: 300 })
    email: string;

    constructor(partial: Partial<User>) {
        super(partial);
        Object.assign(this, partial);
        this.createdBy = this.username;
        this.lastChangedBy = this.username;
      }
}
