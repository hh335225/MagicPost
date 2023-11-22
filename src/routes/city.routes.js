import express from "express";
const routes = express.Router();

import cityController from "../app/controllers/CityController.js";

routes.get('/districts/:city/commune/:district/postal_code/:commune', cityController.get_postal_code);
routes.get('/districts/:city/commune/:district', cityController.get_commune);
routes.get('/districts/:city', cityController.get_districts);
routes.get('/', cityController.get_cities);

export default routes;
