import express from 'express';
const routes = express.Router();

import homeController from '../app/controllers/HomeController.js'

// routes.post('/login', homeController.post_login)

routes.get('/getDistancePage', homeController.test)
//


routes.post('/find_post_office', homeController.list_post_office)
routes.get('/find_post_office', homeController.post_office)
routes.get('/find_postal_items', homeController.postal_items)
routes.post('/find_postal_items', homeController.find_postal_items)
routes.get('/find_costs', homeController.costs)
routes.get('/logout', homeController.logout)
// routes.get('/:other', homeController.notFound)
routes.get('/', homeController.show);

export default routes;
