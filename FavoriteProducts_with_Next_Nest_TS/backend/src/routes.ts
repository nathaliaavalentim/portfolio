import { Router, Request, Response } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated';


//Usuários
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';


//Favoritos
import { CreateFavoriteController } from "./controllers/favorites/CreateFavoriteController";
import { ListFavoritesController } from "./controllers/favorites/ListFavoritesController";
import { RemoveFavoriteController } from "./controllers/favorites/RemoveFavoriteController";
import { RemoveAllFavoritesController } from "./controllers/favorites/RemoveAllFavoritesController";


const router = Router();

//Rotas de Usuário
router.post('/signup', new CreateUserController().handle) //cria novo usuario
router.post('/login', new AuthUserController().handle) //login de usuário
router.get('/me', isAuthenticated, new DetailUserController().handle) //detalhes do usuário para controle de acesso

//Rotas de Favorito
router.post('/favorites', isAuthenticated, new CreateFavoriteController().handle);//cria favorito
router.get('/favorites', isAuthenticated, new ListFavoritesController().handle);//obtem favoritos
router.delete("/favorites/:favoriteId", isAuthenticated, new RemoveFavoriteController().handle); //remove favorito
router.delete("/favorites", isAuthenticated, new RemoveAllFavoritesController().handle);//remove todos os favoritos

export { router };