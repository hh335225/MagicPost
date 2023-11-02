import express from 'express';
const routes = express.Router();

import homeController from '../app/controllers/HomeController.js'

routes.post('/login', homeController.post_login)
routes.get('/', homeController.show);

export default routes;
