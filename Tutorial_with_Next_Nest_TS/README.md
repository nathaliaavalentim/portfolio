INSTRUÇÕES PARA EXECUÇÃO DO PROJETO: 

Instalar BD postgresql

Instalar o ORM Prisma: yarn add prisma

Instalar o Prisma Client: yarn add @prisma/client

Renomear a pasta prisma e rodar npx prisma init para gerar o env

No env, fazer as configurações de acordo com o seu banco

Fazer as configurações do Prisma Client

Criar JWT secret no env (https://www.md5hashgenerator.com/)

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


________________________________________________________________________________
EXPLICAÇÕES SOBRE O CÓDIGO:


O Banco de Dados escolhido foi o PostgreSQL e ORM escolhido foi o Prisma. 

TAREFAS 1.0:
No Backend, separei a estrutura por Controllers, Services e Middleware para controle de acesso de usuários, contando com o JWT para geração de token com o objetivo de autenticar o usuário no acesso às rotas privadas da aplicação.

Rotas Backend:
post /signup: cria novo usuario

post /login: login de usuário

get /me: detalhes do usuário para controle durante a sessão

post /tutorial/new: cria tutorial

put /tutorial/edit: edita o tutorial

get /tutorial: lista os tutoriais

get /tutorial/detail: mostra detalhes do modal

put /tutorial/delete: altera o status do registro do tutorial para false, para que ele não apareça no dashboard, mas permaneça no banco.

Implementei a lógica de id no frontend.

Exemplo:
```
async function handleFinishTutorial(id: string){
        const apiClient = setupAPIClient();
        await apiClient.put('/tutorial/delete', {
            tutorial_id: id,
        })
        const response = await apiClient.get('/tutorial');
        setTutorialList(response.data);
        setModalVisible(false);
        toast.success("Removido com sucesso.")
    }
```

TAREFAS 2.0:
No frontend, usei alguns recursos de MaterialUI, Toastify e Scss para uma interface mais amigável.

Usei hooks como useContext, useState, useEffect e useRouter para acessar o contexto, para os estados e captura de dados. Usei a função canSSRGuest para proteção das rotas.

Rotas Frontend:

/login: tela de login de usuário.

/signup: cadastro de usuários.

/tutorials: contempla o dashboard com listagem de tutoriais juntamente com opção de busca.

/new: para melhor organização do dashboard, contempla o cadastro de novos tutoriais.

No Dashboard, criei os seguintes tipos definidos:

TutorialProps: Define a estrutura de um tutorial individual.

HomeProps: Define as propriedades que o componente Dashboard espera receber (uma lista de tutoriais).

TutorialItemProps: Define a estrutura de um item que será detalhado no modal.


Conforme solicitado, a lista dos tutoriais mostram apenas o Título, Conteúdo e o Criador. Porém, ao clicar no item, ele irá abrir um Modal com detalhes, inclusive com as opções de Editar ou Remover o tutorial.

________________________________________________________________________________
TESTES UNITÁRIOS(Jest):

yarn add jest @types/jest ts-jest --dev

Os testes de backend estão em backend/__test__ e são referentes a criação, remoção, edição e listagem de tutoriais.

Os testes de frontend estão em frontend\src\pages\tutorials\Tutorials.test.tsx referente a funções do dashboard para buscar de tutoriais.

Para executar os testes: yarn test

_________________________________________________________________________________
MELHORIA DE CÓDIGO:

```javascript
function calculateTotalPrice(products){
 let totalPrice = 0;

for(let i=0; i < products.length; i++){
totalPrice += products[i].price;
};

return totalPrice;
};
```

A função parece realizar um somatório de preços de produtos. 
Como melhorias no trecho do código, optaria por usar o método reduce do Javascript para acumular os valores. Além disso, trataria valores nulos.

```javascript
function calculateTotalPrice(products = []) {

  return products.reduce((total, product) => {

    const price = product.price || 0;
    return total + (typeof price === 'number' ? price : 0);
  }, 0);

}
```



























