import fs from 'fs'; // Módulo nativo do node que permite o stream de file.
import csvParse from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> { // Como estou trabalhando com pomise, eu preciso definir que vai ser uma promise do tipo IImportCategory.
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path); // Esta função permite com que eu leia o arquivo em partes (chuncks). O file.path da a ele o path do meu arquivo.
            const categories: IImportCategory[] = [];

            const parseFile = csvParse();

            stream.pipe(parseFile); // O pega o que está sendo lido pelo stream, e joga para onde for determinado.

            parseFile
                .on("data", async (line) => {
                    // Esta função passs a linha como ["name", "description"]
                    const [name, description] = line;
                    // Colocando agr a linha dentro da categories
                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => { // Quando finalizar o parse do meu arquivo eu quero que você coloque na minha promise o categories.
                    fs.promises.unlink(file.path); // Isto irá fazer a remoção dos arquivos.
                    resolve(categories);
                })
                .on("error", (err) => { // Caso tenho um erro, ele vai pegar e passar para o reject o error.
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> { // Como não sei o tipo do file, eu posso colocar como any. Eu descobri o tipo do arquivo info em routes deixando o mouse sobre o file.
        const categories = await this.loadCategories(file);

        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if(!existCategory){
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase };
// Estou instalando uma bibliotéca que permite com que eu manipule mais facilmente arquivos csv chamada de csv-parse.