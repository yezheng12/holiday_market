const UserController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/userRegister', UserController.registerUser);
    app.post('/api/userLogin', UserController.loginUser);
    app.get('/api/user/:id', UserController.getUserById);
    app.get('/api/getAllUsers',UserController.getAllUsers)
}