# Use uma imagem base oficial do Node.js para buildar o frontend
FROM node:16 as build

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências do frontend
RUN npm install

# Copie o restante do código do frontend
COPY . .

# Build do projeto React
RUN npm run build

# Use uma imagem base mais leve para servir os arquivos estáticos
FROM nginx:alpine

# Copie os arquivos buildados para a pasta padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta que o Nginx vai servir (por exemplo, 80)
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
