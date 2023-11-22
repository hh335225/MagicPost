import authentication from '../app/middleware/Authentication.js'
import homeRoutes from './home.routes.js'
import loginRoutes from './login.routes.js'
import managerRoutes from './manager.routes.js'
import transaction_staffRoutes from './transaction_staff.routes.js'
import citiesRoutes from './city.routes.js'
import distanceRoutes from './getDistance.routes.js'
import { checkHeaderFooter } from '../app/middleware/checkHeader.js' // muốn trang nào có header thì thêm cái này



export default function route(app) {
    app.use('/transaction_staff',authentication.checkTransactionStaff, transaction_staffRoutes)
    app.use('/manager', authentication.checkManager,managerRoutes)
    app.use('/login',loginRoutes)
    app.use('/cities', citiesRoutes)
    app.use('/getDistance', distanceRoutes)
    app.use('/', homeRoutes);
}
