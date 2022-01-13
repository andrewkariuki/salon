import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "./Booking";
import { Service } from "./Service";
import { User } from "./User";

@Entity("salons")
export class Salon extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("varchar", { length: 100 })
  category: string;

  @Column("text", { nullable: true })
  pictureUrl: string;

  @Column("varchar", { length: 255 })
  description: string;

  @Column("varchar", { length: 255 })
  city: string;

  @Column("int") slots: number;

  @Column("int") availability: number;

  @Column("int", { nullable: true }) price: number;

  @Column("uuid") userId: string;

  @OneToMany(() => Service, (service) => service.salon)
  services: Service[];

  @ManyToOne(() => User, (user) => user.salons)
  user: User;

  @OneToMany(() => Booking, (booking) => booking.salon)
  bookings: Booking[];
}
