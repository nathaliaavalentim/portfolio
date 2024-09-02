Passos:

Comandos Docker: 

docker pull nathaliavalentim/imagem_app_boletos:1

docker run -d -p 8000:8000 nathaliavalentim/imagem_app_boletos:1

docker-compose up (se estiver usando Docker Compose)

Acessar no navegador: http://localhost:8000/boletos/upload/

##################################################

- Para copiar para um diretório local:

Criar um diretório local e o acessar pelo terminal

docker pull nathaliavalentim/imagem_app_boletos:1

docker run -d --name conteiner-boletos nathaliavalentim/imagem_app_boletos:1

docker cp conteiner-boletos:code .

##################################################

Executando o projeto localmente:

Executar: python manage.py runserver

No navegador, digite: http://127.0.0.1:8000/boletos/upload/

Faça o upload do arquivo csv

A simulação dos emails enviados aparecerão no console do IDE (Configuração de settings.py)

##################################################

Testes unitários:

Garante que um e-mail foi enviado com os detalhes corretos.
Verifica se a URL do boleto gerado está correta, e se o arquivo PDF foi criado. Remove o arquivo gerado para limpar após o teste.

##################################################

Testes de integração:

Teste de Processamento de CSV Inválido e Teste de Processamento de CSV Válido.

##################################################

Execução de testes: python manage.py test boletos.tests.integration.tests e python manage.py test boletos.tests.unit.tests


##################################################

Disponível em:

https://github.com/nathaliaavalentim/app_boletos

https://hub.docker.com/repository/docker/nathaliavalentim/imagem_app_boletos
