
interface Course { // Aqui eu estou criando uma interface
    name: string;
    duration?: number; // O ? define que o parametroé opicional.
    educator: string;
}


class CreateCourseService {

    execute({ duration = 8, educator, name }: Course) { // Como a duration é opcional , eu posso colocar um standard value para quando o usuário não a preencher.
        console.log(name, duration, educator);
    }
}

export default new CreateCourseService(); // O new permite com que eu não precise instanciar ele.