FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependências e esquema do Prisma
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm install

# Gerar Prisma Client para o PostgreSQL
RUN npx prisma generate

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta em que a aplicação roda
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
