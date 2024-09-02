# Use uma imagem base oficial do Node.js
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências do backend
RUN npm install

# Copie o restante do código do backend
COPY . .

# Exponha a porta que a aplicação vai rodar (por exemplo, 3000)
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
