const userController = require('../app/controllers/user');
const authTokenMiddleware = require('../app/middlewares/authToken');

module.exports = app => {

  app.post('/register', userController.register)
  app.post('/auth', userController.auth)
  app.post('/auth/forgot_password', userController.forgotPassword)
  app.post('/auth/reset_password', userController.resetPassword)

  app.route('/user')
    .all(authTokenMiddleware.authenticationJWT)
    .get(userController.userProfile)

  // app.route('/projects')
  //   .all(app.app.middlewares.authToken.authenticationJWT)
  //   .post(app.app.controllers.project.createProject)
  //   .get(app.app.controllers.project.getProject)

  // app.route('/projects/:projectId')
  //   .all(app.app.middlewares.authToken.authenticationJWT)
  //   .get(app.app.controllers.project.getProjectById)
  //   .delete(app.app.controllers.project.removeProject)
  //   .put(app.app.controllers.project.updateProject)
}