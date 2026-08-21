import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timestamp } from 'typeorm/driver/mongodb/bson.typings.js';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  registrationNumber!: string;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeRegistration() {
    if (this.registrationNumber) {
      this.registrationNumber = this.registrationNumber.toUpperCase().trim();
    }
  }

  @Column()
  make!: string;

  @Column()
  model!: string;

  @Column()
  year!: number;

  @Column()
  seats!: number;

  @Column({ default: true })
  isAvailable!: boolean;

  @CreateDateColumn()
  createdAt!: Timestamp;
}
