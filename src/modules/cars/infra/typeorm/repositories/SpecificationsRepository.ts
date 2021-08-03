import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";


class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
    
    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);
    }
    
    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({
            name,
        }) //this.specifications.find(spec => spec.name === name); // Como a função não está dentro de chaves, então não é preciso o return, pois ele feito automaticamente.
        return specification;
    }
}

export { SpecificationsRepository };