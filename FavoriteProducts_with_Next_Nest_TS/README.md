INSTRUÇÕES PARA EXECUÇÃO DO PROJETO: 

Instalar BD postgresql

Instalar o ORM Prisma: yarn add prisma

Instalar o Prisma Client: yarn add @prisma/client

Renomear a pasta prisma e rodar npx prisma init para gerar o env

No env, fazer as configurações de acordo com o seu banco

Fazer as configurações do Prisma Client

Criar JWT secret no env (https://www.md5hashgenerator.com/), colocando e gerando uma chave MD5, criando JWT_SECRET=coloque-a-chave-gerada no env.

Migrations: yarn prisma migrate dev

Instalações importantes para o dashboard:

yarn add brcryptjs

yarn add @types/brcryptjs

yarn add jsonwebtoken

yarn add @types/jsonwebtoken

yarn add dotenv

Execuação do projeto (frontend e backend):

yarn install 

yarn dev


____

























