import { Router } from 'express'

import burgersController from './controllers/BurgersController'
import usersController from './controllers/UsersController'
import cartController from './controllers/CartController'
import favoritesController from './controllers/FavoritesController'

const routes = Router()

routes.get('/burgers', burgersController.index)
routes.get('/burgers/:id', burgersController.show)
routes.post('/burgers', burgersController.create)
routes.put('/burgers/:id', burgersController.update)
routes.delete('/burgers/:id', burgersController.delete)

routes.post('/signup', usersController.signup)
routes.post('/signin', usersController.signin)

routes.get('/users/:id/favorites', favoritesController.index)
routes.post('/users/:id/favorites', favoritesController.create)
routes.delete('/users/:id/favorites', favoritesController.delete)
routes.get('/users/:userId/favorites/:burgerId', favoritesController.show)

routes.post('/users/:id/cart', cartController.create)
routes.delete('/users/:id/cart', cartController.delete)
routes.get('/users/:id/cart', cartController.index)

export default routes