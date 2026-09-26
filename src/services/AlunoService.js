const prisma = require("../databases/prisma");
const AlunoInvalidoError = require("../errors/AlunoInvalidoError");
const AlunoNaoEncontradoError = require("../errors/AlunoNaoEncontradoError");
const EmailDuplicadoError = require("../errors/EmailDuplicadoError");

class AlunoService {

    async findMany(page, pageSize, orderBy = "id", order = "asc") {
        const camposPermitidos = ["id", "nome", "email", "createdAt", "updatedAt"];
        if (!camposPermitidos.includes(orderBy)) {
            throw new AlunoInvalidoError(`Campo de ordenação inválido: "${orderBy}". Use: ${camposPermitidos.join(", ")}.`);
        }

        const direcao = order.toLowerCase() === "desc" ? "desc" : "asc";
        const total = await prisma.aluno.count();
        const alunos = await prisma.aluno.findMany({
            skip: (page - 1) * pageSize,
            take: Number(pageSize),
            orderBy: {
                [orderBy]: direcao
            }
        });
        return { alunos, total };
    }

    async findUnique(id) {
        const aluno = await prisma.aluno.findUnique({
            where: { id: Number(id) }
        });

        if (!aluno) {
            throw new AlunoNaoEncontradoError();
        }

        return aluno;
    }

    async create(aluno) {
        const { nome, email } = aluno;
        if (!nome || !email) {
            throw new AlunoInvalidoError();
        }

        const novoAluno = await prisma.aluno.create({ data: aluno });

        return novoAluno;
    }

    async update(id, data) {
        if (!data || Object.keys(data).length === 0) {
            throw new AlunoInvalidoError("Corpo da requisição vazio. Informe os dados para atualização.");
        }

        await this.findUnique(id);

        try {
            const alunoAtualizado = await prisma.aluno.update({
                where: { id: Number(id) },
                data: data
            });
            return alunoAtualizado;
        } catch (error) {
            if (error.code === 'P2002') {
                throw new EmailDuplicadoError();
            }
            
            throw error;
        }
    }

    async delete(id) {
        await this.findUnique(id);

        await prisma.aluno.delete({
            where: { id: Number(id) }
        });
    }
}

module.exports = new AlunoService();