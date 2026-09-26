require("dotenv/config")
const express = require("express");
const alunoRouter = require("./routes/alunoRoutes");

const app = express();
app.use(express.json());
app.use((request, response, next)=>{
    console.log("Esse middleware está sendo executado antes das rotas de alunos!");
    next();
});
app.use("/alunos", alunoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
