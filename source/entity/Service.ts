import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "./Booking";
import { Salon } from "./Salon";

@Entity("services")
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("text", { nullable: true })
  pictureUrl: string;

  @Column("varchar", { length: 255 })
  description: string;

  @Column("int") price: number;

  @Column("uuid") salonId: string;

  @ManyToOne(() => Salon, (salon) => salon.services)
  salon: Salon;

  // @OneToMany(() => Booking, (booking) => booking.service)
  // bookings: Booking[];
}
