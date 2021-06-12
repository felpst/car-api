import { Request, Response } from 'express';
import CreateCourseService from './CreateCourseService';


export function createCourse(req: Request, res: Response) {
    CreateCourseService.execute({ // Estou passando os parametors da função assim para que eles possam condizer com a interface. Desta forma os parametros podem ser passados em qualquer ordem.
        name: "Nodejs",
        educator: "Felps",
        duration: 10
    }); // Os parametros tem que ser o mesmo tipo espcificado na criação da classe.

    return res.send();
}