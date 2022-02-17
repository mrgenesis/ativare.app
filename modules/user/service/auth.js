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

    const authorization = await authc.generateToken({ param: { ...user }});
    return { authorization, user: { email: user.email, name: user.name } }
  }

  return new ServiceFactory(auth, 'w', 'Permite entrar com login de senha para visualizar as informações restritas.');
};
