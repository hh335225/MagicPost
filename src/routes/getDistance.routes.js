import express from 'express';
const routes = express.Router();

import getDistance from '../app/controllers/DistanceController.js'



routes.post('/', getDistance.getDistance);

export default routes;