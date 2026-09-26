const ApiError = require("./ApiError");

class EmailDuplicadoError extends ApiError {
    constructor(message = "O email informado já está em uso por outro aluno.") {
        super(message, 409);
    }
}

module.exports = EmailDuplicadoError;
