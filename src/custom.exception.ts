import { HttpException } from "@nestjs/common";

export class CustomException extends HttpException {
    constructor(message: string[], status: number, error: string = 'Bad Request') {
        const reponse = {
            statusCode: 400,
            message,
            error,
        }
        super(reponse, status);
    }
}


