import authentication from '../app/middleware/Authentication.js'
import homeRoutes from './home.routes.js'
import loginRoutes from './login.routes.js'
import managerRoutes from './manager.routes.js'
import transaction_staffRoutes from './transaction_staff.routes.js'
import transaction_managerRoutes from './transaction_manager.routes.js'
import warehouse_staffRoutes from './warehouse_staff.routes.js'
import citiesRoutes from './city.routes.js'
import distanceRoutes from './getDistance.routes.js'
import { checkHeaderFooter } from '../app/middleware/checkHeader.js' // muốn trang nào có header thì thêm cái này



export default function route(app) {
    app.use('/warehouse_staff', authentication.checkWarehouseStaff, warehouse_staffRoutes)
    app.use('/transaction_staff',authentication.checkTransactionStaff, transaction_staffRoutes)
    app.use('/transaction_manager',authentication.checkTransactionStaff, transaction_managerRoutes)
    app.use('/manager', authentication.checkManager,managerRoutes)
    app.use('/login',loginRoutes)
    app.use('/cities', citiesRoutes)
    app.use('/getDistance', distanceRoutes)
    app.use('/', homeRoutes);
}
