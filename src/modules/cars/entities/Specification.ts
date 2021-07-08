// Como os atributos desta classe são os mesmos que os da Category.ts, poderia ser criado uma classe mais abstrata para conter todos eles e então esta classe e a Category herdariam dela. Como não temos certeza das mudanças com relação a esta classe e a outra, foi optado por não reutilizar o código. 

import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity("specifications")
class Specification {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Specification };