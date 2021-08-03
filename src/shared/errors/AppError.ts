export class AppError {
    public readonly message: string; // readonly makes attribute available only to be read.

    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) { // Stastus code here is given a default value of 400 if there is no value assigned to it.
        this.message = message;
        this.statusCode = statusCode;
    }
}