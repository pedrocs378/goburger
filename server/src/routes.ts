import { Router } from 'express'

import burgersController from './controllers/BurgersController'
import usersController from './controllers/UsersController'
import cartController from './controllers/CartController'

const routes = Router()

routes.get('/burgers', burgersController.index)
routes.get('/burgers/:id', burgersController.show)
routes.post('/burgers', burgersController.create)
routes.put('/burgers/:id', burgersController.update)
routes.delete('/burgers/:id', burgersController.delete)

routes.post('/signup', usersController.signup)
routes.post('/signin', usersController.signin)

routes.put('/users/:id', usersController.update)
routes.get('/users/:id/cart', cartController.show)
routes.post('/users/:id/cart', cartController.create)

export default routes