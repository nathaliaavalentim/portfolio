import { Router, Request, Response } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated';


//Usuários
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';


//Tutoriais 
import { CreateTutorialController } from './controllers/tutorial/CreateTutorialController';
import { EditTutorialController } from './controllers/tutorial/EditTutorialController';
import { ListTutorialController } from './controllers/tutorial/ListTutorialController';
import { DetailsTutorialsController } from './controllers/tutorial/DetailsTutorialsController';
import { FinishTutorialController } from './controllers/tutorial/FinishTutorialController';


const router = Router();

//Rotas de Usuário
router.post('/signup', new CreateUserController().handle) //cria novo usuario
router.post('/login', new AuthUserController().handle) //login de usuário
router.get('/me', isAuthenticated, new DetailUserController().handle) //detalhes do usuário para controle de acesso


//Rotas de Tutoriais
router.post('/tutorial/new', isAuthenticated, new CreateTutorialController().handle)//cria tutorial
router.put('/tutorial/edit', isAuthenticated, new EditTutorialController().handle) //edita o tutorial
router.get('/tutorial', isAuthenticated, new ListTutorialController().handle) //lista os tutoriais
router.get('/tutorial/detail', isAuthenticated, new DetailsTutorialsController().handle)//mostra detalhes do modal
router.put('/tutorial/delete', isAuthenticated, new FinishTutorialController().handle)//deleta tutorial

export { router };