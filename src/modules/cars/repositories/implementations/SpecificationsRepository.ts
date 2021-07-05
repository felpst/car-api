import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }
    
    create({ description, name }: ICreateSpecificationDTO): void {
        const specification = new Specification();
        
        Object.assign(specification, {
            description, 
            name, 
            created_at: new Date(),
        });
        
        this.specifications.push(specification);
    }
    
    findByName(name: string): Specification {
        const specification = this.specifications.find(spec => spec.name === name); // Como a função não está dentro de chaves, então não é preciso o return, pois ele feito automaticamente.
        return specification;
    }
}

export { SpecificationsRepository };