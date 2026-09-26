# Programação para Frameworks Web

Este repositório contém os códigos e exemplos desenvolvidos durante a disciplina **Programação para Frameworks Web**, ministrada pelo professor **Thiago Rodrigues**.

## 🐳 Executando com Docker (Recomendado)

Para subir a aplicação e o banco de dados PostgreSQL usando Docker Compose:

```bash
docker compose up --build
```

Isso irá:
1. Subir um container PostgreSQL 16 Alpine na porta `5432`.
2. Compilar e subir a aplicação Express na porta `3000`.
3. Executar o `npx prisma db push` automaticamente para aplicar a estrutura do banco.

Para encerrar os containers:

```bash
docker compose down
```

---

## 🚀 Executando Localmente (Sem Docker)

### 1. Clonar o repositório e instalar dependências

```bash
npm install
```

### 2. Variáveis de Ambiente

Crie ou edite o arquivo `.env` baseado no `.env.example`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/univ?schema=public"

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=univ

PORT=3000
```

### 3. Gerar o Prisma Client e Sincronizar o Banco

```bash
npx prisma generate
npx prisma db push
```

### 4. Iniciar a aplicação

```bash
npm run dev
```

ou:

```bash
npm start
```

---

**Disciplina:** Programação para Frameworks Web  
**Professor:** Thiago Rodrigues
