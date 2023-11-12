import express from 'express';
const routes = express.Router();

import homeController from '../app/controllers/HomeController.js'

// routes.post('/login', homeController.post_login)
routes.get('/find_post_office', homeController.post_office)
routes.get('/find_postal_items', homeController.postal_items)
routes.get('/find_costs', homeController.costs)
routes.get('/', homeController.show);

export default routes;
