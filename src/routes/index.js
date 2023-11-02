import authentication from '../app/middleware/Authentication.js'
import homeRoutes from './home.routes.js'
import managerRoutes from './manager.routes.js'


export default function route(app) {
    
    app.use('/manager', authentication.checkManager,managerRoutes)
    app.use('/', homeRoutes);
}
