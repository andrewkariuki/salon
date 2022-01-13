import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Salon } from "./Salon";
import { Service } from "./Service";
import { User } from "./User";

@Entity("bookings")
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("uuid") userId: string;

  @Column("date") date: string;

  @Column("boolean", { default: false })
  cancelled: boolean;

  @Column("boolean", { default: false })
  complete: boolean;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Column("uuid") salonId: string;

  @ManyToOne(() => Salon, (salon) => salon.bookings)
  salon: Salon;

  // @Column("uuid") serviceId: string;

  // @ManyToOne(() => Service, (services) => services.bookings)
  // service: Service;
}
