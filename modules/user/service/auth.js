'use strict';


module.exports = function setContext(context) { 
  const { Auth, ServiceFactory } = context.Classes;
  const authc = new Auth();  

  async function auth(email, password) {
    const user = await context.model.user.findOne({ email }).select('+password');

    if (!user) {
      return 'User not found/Password invalid.';
    }
    
    if (!await authc.compare(password, user.password)) {
      return 'User not found/Password invalid.';
    }
    
    delete user.password;
    
    return authc.generateToken({ ...user });
  }

  return new ServiceFactory(auth, 'w', 'Permite entrar com login de senha para visualizar as informações restritas.');
};
