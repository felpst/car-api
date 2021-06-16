import { v4 as uuidv4 } from 'uuid'; // Aqui eu estou sobreecrevendo o nome da função v4 do uuid como uuidv4.

class Category {
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() { // O construtor é um método que é chamado quando a classe é instanciada.
        if(!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Category };