import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("rentals")
class Rental {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Car) // Many to one because there will be many rentals for the same car.
    @JoinColumn({ name: "car_id"})
    car: Car;

    @Column()
    car_id: string;

    @Column()
    user_id: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    expected_return_date: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = v4();
        }
    }
}

export { Rental }