import { v4 as uuidv4 } from 'uuid'; // Aqui eu estou sobreecrevendo o nome da função v4 do uuid como uuidv4.
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"; // 

@Entity("categories")
class Category {
    @PrimaryColumn() // Since the name I have used here for the id variable is the same that I have used on my database columns, I don't need to pass anything with @PrimaryColumn(). If I needed to I could pass @Column("name")
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() { // O construtor é um método que é chamado quando a classe é instanciada.
        if(!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Category };