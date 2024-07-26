const AdminControler = require('../controllers/admin.controller');
module.exports = (app) => { 
    app.post('/api/adminLogin', AdminControler.loginAdmin);
    app.post('/api/adminRegister', AdminControler.registerAdmin);
}